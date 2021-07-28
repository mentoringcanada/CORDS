import os
import tweepy
from dotenv import load_dotenv
load_dotenv()

auth = tweepy.OAuthHandler(os.environ.get("CONSUMER_KEY"),
                           os.environ.get("CONSUMER_SECRET"))
auth.set_access_token(os.environ.get("ACCESS_TOKEN"),
                      os.environ.get("ACCESS_TOKEN_SECRET"))

api = tweepy.API(auth)


def getLink(phrase, coords):
    """
        Returns reply link for search
    """
    print(coords)
    phrase = phrase.replace(" ", "%20")
    link = f"staging.cordsconnect.ca/search/results?ln=en&query={phrase}&distance=10&lat={coords[1]}&lng={coords[0]}&filter=best&page=1"
    return link


def verifyTweet(text):
    """
        User verification of tweet 
    """
    while True:
        print(text)
        accepted = input("Does this tweet work with the phrase? (y / n): ")
        if (accepted == "y"):
            return True
        elif (accepted == "n"):
            print("")
            break


def replyTweet(link, id):
    """
        Replies to tweet 
    """
    try:
        # api.update_status(link, id)
        print("Successfully replied with link.")
        print(link + "\n")
    except:
        print("Couldn't reply. Possibly already tweeted.")


def replyTweets(tweets, phrase):
    """
        Replies to tweets with link to CORDS
    """
    for tweet in tweets:
        if (tweet.coordinates):
            link = getLink(phrase, tweet.coordinates["coordinates"])
            allow = verifyTweet(tweet.text)
            if (allow):
                replyTweet(link, tweet.id)
            print("----------------\n")


def getTweets(phrase, count=5):
    """
        Returns count amount of tweets matching keyword  
    """
    try:
        tweets = api.search(
            phrase=phrase, geocode='43.653226,-79.3831843,100km', count=count)
        return tweets
    except:
        print("Search failed!\n")
        return []


def manualMode():
    """
        Manual version for testing 
    """
    # Input
    phrase = input("\nPlease input a phrase to search tweets. \n")
    count = input("\nHow many tweets do you wan't to see? \n")
    print("--------------------------------\n")

    tweets = getTweets(phrase, count)
    replyTweets(tweets, phrase)


def main():
    print("Which mode would you like to use?")
    while True:
        mode = input("Enter 'manual' or 'bot'(WIP).\n")
        if (mode == "manual"):
            manualMode()
        if (mode == "bot"):
            print("\nbot mode is unfinished, please select another.")


main()
