import os
import tweepy
from dotenv import load_dotenv
load_dotenv()

auth = tweepy.OAuthHandler(os.environ.get("CONSUMER_KEY"),
                           os.environ.get("CONSUMER_SECRET"))
auth.set_access_token(os.environ.get("ACCESS_TOKEN"),
                      os.environ.get("ACCESS_TOKEN_SECRET"))

api = tweepy.API(auth)


def getLink(phrase):
    """
        Returns reply text for search
    """
    phrase = phrase.replace(" ", "%20")
    link = f"staging.cordsconnect.ca/search/results?ln=en&query={phrase}&distance=10&filter=best&page=1"
    return link


def replyTweets(tweets, phrase):
    """
        Replies to tweets with link to CORDS
    """
    for tweet in tweets:
        print(tweet.text)
        accepted = input("Does this tweet work with the phrase? (y / n): ")
        link = getLink(phrase)
        if (accepted == "y"):
            try:
                # api.update_status(link, tweet.id)
                print("Successfully replied with link.")
                print(link + "\n")
            except:
                print("Couldn't reply. Possibly already tweeted.")
        else:
            print("")
        print("----------------\n")


def getTweets(phrase, count=10):
    """
        Returns count amount of tweets matching keyword  
    """
    tweets = api.search(phrase, count=count)
    return tweets


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


# Main
print("Which mode would you like to use?")
while True:
    mode = input("Enter 'manual' or 'bot'(WIP).\n")
    if (mode == "manual"):
        manualMode()
    if (mode == "bot"):
        print("\nbot mode is unfinished, please select another.")
