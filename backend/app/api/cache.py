from flask_caching import Cache

configuration = {
    'CACHE_TYPE': 'filesystem',
    'CACHE_DIR': 'app/api/cache'
}

cache = Cache(config=configuration)
