from sklearn import linear_model
from sklearn import svm
from sklearn import neighbors
import dataset

def train():
    mod_logreg = linear_model.LogisticRegression(C=1e2)
    mod_svm = svm.SVC(C=1e2)
    mod_neigh = neighbors.KNeighborsClassifier(n_neighbors=3)

    X, y = dataset.getDataset()

    mod_logreg.fit(X, y)
    mod_svm.fit(X, y)
    mod_neigh.fit(X, y)

    accuracy = mod_logreg.score(X, y)
    print('logistic regression accuracy: ', accuracy)
    accuracy = mod_svm.score(X, y)
    print('svm accuracy: ', accuracy)
    accuracy = mod_neigh.score(X, y)
    print('nearest neighbor accuracy: ', accuracy)

if __name__ == '__main__':
    train()
