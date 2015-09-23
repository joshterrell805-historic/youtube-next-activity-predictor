Set up a system to  get a list of activities for a particular user given the
username (I believe the [API](https://developers.google.com/youtube/2.0/developers_guide_protocol_activity_feeds#User_activity_feeds)
allows you to get data for the last 60 days).
Activities include rating a video, marking video as a favorite, commenting on a
video, uploading a video.
Based on that,  build a predictor of what the next activity for the user will be
by using three algorithms of your choice

### Instructions

#### Download a google developer's key with access to the Youtube Data API
1. Sign up for a
[google developer's account](https://console.developers.google.com/project).
1. Create a project
1. Enable the youtube data api
1. From the credentials tab, create a new api key (server).
1. Save your api key in the environment variable "GOOGLE\_API\_KEY"
  - linux/mac: `export GOOGLE_API_KEY=your_key_here`
