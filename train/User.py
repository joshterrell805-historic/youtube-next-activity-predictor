import os
import csv

class User:
    dirpath = os.path.dirname(__file__)

    def __init__(self, username, channelId):
        self.username = username
        self.channelId = channelId

    def __str__(self):
        return str([self.username, self.channelId])

    @classmethod
    def readAll(cls):
        filepath = os.path.join(cls.dirpath, "data", "users.csv")
        with open(filepath, "r") as fh:
            reader = csv.DictReader(fh)
            return [User(r['username'], r['channelId']) for r in reader]

    def getChannelActivities(self):
        filepath = os.path.join(self.dirpath, "data", "activity",
                self.channelId + ".csv")
        with open(filepath, "r") as fh:
            reader = csv.DictReader(fh)
            return list(reader)

if __name__ == '__main__':
    users = User.readAll()
    print("users:", len(users))
    print(users[0])
    activities = users[0].getChannelActivities()
    print(users[0].username + "'s activities:", len(activities))
    print(activities[0])
