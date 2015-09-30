from User import User

types = ["bulletin", "channelItem", "comment", "favorite", "like",
        "playlistItem", "recommendation", "social", "subscription",
        "upload"]

def getDataset(users=None):
    """Return a list of examples (for training or testing)"""
    if users == None:
        users = User.readAll()

    X = []
    y = []
    for user in users:
        activities = user.getChannelActivities()
        if len(activities) >= 3:
            features = computeFeatures(activities[1:len(activities)])
            output = activities[0]['type']
            output = types.index(output)
            X.append(features)
            y.append(output)
    return (X, y)

def computeFeatures(activities):
    """Given the latest activities for a user, return a feature vector."""
    # TODO come up with a list of features with a bit better predictive power
    features = [computePercentType(activities, t) for t in types]
    # features.extend([1 if activities[-2]['type'] == t else 0 for t in types])
    return features

def computePercentType(activities, t):
    count = 0
    for a in activities:
        if a['type'] == t:
            count += 1
    return count / len(activities)

if __name__ == '__main__':
    print(getDataset())
