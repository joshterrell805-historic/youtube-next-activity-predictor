from sklearn import linear_model
from sklearn import svm
from sklearn import neighbors
import dataset
import numpy
import math
import pickle
import os


def train(X, y, C_reg=1e2, k_neighbors=3):
    """train three models and return them in a tuple
    (logistic regression, svm, nearest neighbors)
    """
    mod_logreg = linear_model.LogisticRegression(C=1e2)
    mod_svm = svm.SVC(C=1e2)
    mod_neigh = neighbors.KNeighborsClassifier(n_neighbors=3)

    mod_logreg.fit(X, y)
    mod_svm.fit(X, y)
    mod_neigh.fit(X, y)
    return (mod_logreg, mod_svm, mod_neigh)

if __name__ == '__main__':
    X, y = dataset.getDataset()
    examples = list(zip(X, y))
    numpy.random.shuffle(examples)
    testExampleCount = math.floor(0.30 * len(examples))
    testSet = examples[:testExampleCount]
    trainSet = examples[testExampleCount:]
    X, y = zip(*trainSet)
    models = train(X, y)

    X, y = zip(*testSet)
    accuracy = models[0].score(X, y)
    print('logistic regression accuracy: ', accuracy)
    accuracy = models[1].score(X, y)
    print('svm accuracy: ', accuracy)
    accuracy = models[2].score(X, y)
    print('nearest neighbor accuracy: ', accuracy)

    os.chdir(os.path.abspath(os.path.dirname(__file__)))
    with open('data/trained-models.pkl', 'wb') as fh:
        pickle.dump(models, fh)

    print('trained models saved to disk')
