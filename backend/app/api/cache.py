from flask_caching import Cache


class AppCache:
    cache = None

    @staticmethod
    def init_cache(app):
        configuration = {
            'CACHE_TYPE': 'redis',
            'CACHE_REDIS_HOST': app.config['REDIS_HOST'],
            'CACHE_REDIS_PORT': app.config['REDIS_PORT'],
        }
        AppCache.cache = Cache(config=configuration)
        AppCache.cache.init_app(app)

    @staticmethod
    def get_cache():
        return AppCache.cache
