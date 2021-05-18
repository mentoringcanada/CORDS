from random import randrange


cache_size = 1000


class AppState:
    def __init__(self):
        self.index_to_ID = ['0']*cache_size
        self.cache = Cache()



class Cache:
    def search(self, ignored_vector, n):
        output = []
        for _ in range(n):
            output.append(randrange(cache_size))
        return output, [output]