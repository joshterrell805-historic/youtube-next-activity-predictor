import pickle
import sys
import subprocess
import dataset
import os
from User import User

if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("usage: python predict.py <channelId or username>")
        sys.exit(0)

    filename = 'data/trained-models.pkl'
    os.chdir(os.path.abspath(os.path.dirname(__file__)))

    try:
        with open(filename, 'rb') as fh:
            models = pickle.load(fh)
    except Exception as e:
        if str(e).find(filename):
            print("Saved model does not exist. " +
                    "You must first train the models.")
            sys.exit(0)
        else:
            raise e

    if sys.argv[1][0:2] == 'UC':
        channelId = sys.argv[1]
    else:
        channelId = subprocess.check_output(["node",
                "../download/pYoutubeChannelIdFromUsername.js",
                sys.argv[1]])
        channelId = channelId.strip().decode('utf-8')

    print('predicting last event for channelId: ' + channelId)

    subprocess.call(["node", "../download/pDownloadUserActivity.js", channelId])

    X, y = dataset.getDataset([User('', channelId)])

    if len(X) == 0:
        print('not enough history for user')
        sys.exit(0)

    print('actual last event: ' + dataset.types[y[0]])
    print('predicted last events...')

    output = models[0].predict(X)
    print('logistic regression: ' + dataset.types[output[0]])
    output = models[1].predict(X)
    print('support vector machine: ' + dataset.types[output[0]])
    output = models[2].predict(X)
    print('nearest neighbor: ' + dataset.types[output[0]])
