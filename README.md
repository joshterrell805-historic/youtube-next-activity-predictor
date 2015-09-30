*youtube-next-activity-predictor* is a collection of tools for downloading,
training, and predicting youtube user activities.

The goal of this project is to predict a youtube user's next activity given the
user's current history of activities.

### Project Dependencies
Before running any code, you'll need to install the following dependencies:
- nodejs (and npm)
- python3
- [scipy and scikit-learn (python libraries)](
  http://scikit-learn.org/stable/install.html)
  `pip install -U numpy scipy scikit-learn`

You'll also need to run `npm install` in the project's root directory to
install the nodejs modules this project depends on.

### Download Data
The `download/` directory contains code for downloading and maintaining a
file-database of youtube users and their activities.

In order to train a model so you can predict the activities of new users,
you'll need to download the activity history for the users in `data/users.csv`.

**Important:** to download data from youtube (also done in predict.py) you'll
need to provide a google developer's API key in the enviromentment variable
`GOOGLE_API_KEY`. Further instructions are located at the bottom of this README.

To download the activity-history for all users in `data/users.csv`, run
`node download/downloadUserActivity.js`.

### Train & Predict
The `predict/` directory holds scipts to train and evaluate machine learning
models using the *downloaded* data. It also holds a prediction script.

To train the model using the users in `data/users.csv`, run `python
predict/train.py`. This script will use 70% of the data to train logistic
regression, support vector machine, and k-nearest neighbors models, and
use the remaining 30% to evaluate the algorithms' prediction accuracy.

To predict the last event for a user given all history but the last
event (youtube returns up to 256 previous history events), use the predict.py
script. Call it with the username or channelId of the user you wish to predict.
For example, `python predict.py UCUAmhvYBcgftL9clT7xSYgg` or `python predict.py
YoussefMeftah`.

### Specify a Google Developer's API key
To use scripts which interface with youtube's data API, you must provide
a google developer's API key in the environment variable `GOOGLE_API_KEY`.

1. Sign up for a
[google developer's account](https://console.developers.google.com/project).
1. Create a project
1. Enable the youtube data api
1. From the credentials tab, create a new api key (server).
1. Save your api key in the environment variable "GOOGLE\_API\_KEY"
  - linux/mac: `export GOOGLE_API_KEY=your_key_here`

### Limitations
This is a demonstration of my ability to scrape for and parse data as well as
use, tune, and evaluate machine-learning algorithms. As such, I didn't spend
much time tuning features or tweaking algorithms.

A useful predictor would require much more attention to features. For instance,
channel statistics (view count, comment count, ...), recent history, and other
chanel/user information could help with the predictive power of this tool. Also,
more tuning of the three algorithms using the regularization and k nearest
neighbors parameters might go a long way.
