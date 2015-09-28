from sklearn import linear_model
import dataset

def train():
    logreg = linear_model.LogisticRegression(C=1e2)
    X, y = dataset.getDataset()
    logreg.fit(X, y)
    accuracy = logreg.score(X, y)
    print(accuracy)

if __name__ == '__main__':
    train()
