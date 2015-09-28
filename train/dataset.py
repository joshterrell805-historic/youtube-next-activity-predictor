from User import User

types = ["bulletin", "channelItem", "comment", "favorite", "like",
        "playlistItem", "recommendation", "social", "subscription",
        "upload"]

def getDataset():
    """Return a list of examples (for training or testing)"""
    users = User.readAll()
    X = []
    y = []
    for user in users:
        activities = user.getChannelActivities()
        if len(activities) >= 2:
            features = computeFeatures(activities[1:len(activities)])
            output = activities[0]['type']
            output = types.index(output)
            X.append(features)
            y.append(output)
    return (X, y)

def computeFeatures(activities):
    """Given the latest activities for a user, return a feature vector."""
    # TODO come up with a list of features with a bit better predictive power
    return [computePercentType(activities, t) for t in types]

def computePercentType(activities, t):
    count = 0
    for a in activities:
        if a['type'] == t:
            count += 1
    return count / len(activities)

if __name__ == '__main__':
    print(getDataset())
