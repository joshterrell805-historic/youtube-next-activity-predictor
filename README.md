Set up a system to  get a list of activities for a particular user given the
username (I believe the [API](https://developers.google.com/youtube/2.0/developers_guide_protocol_activity_feeds#User_activity_feeds)
allows you to get data for the last 60 days).
Activities include rating a video, marking video as a favorite, commenting on a
video, uploading a video.
Based on that,  build a predictor of what the next activity for the user will be
by using three algorithms of your choice

### Instructions

#### Specify a Google Developer's API key
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

A useful predictor would require much more attention to features. For
instance, channel statistics (view count, comment count, ...) and other
chanel/user information could help with the predictive power of this tool.
