import createCache, { EmotionCache, Options } from '@emotion/cache'
import { useYomtorEmotionOptions } from '../theme/YomtorProvider'

const defaultCacheOptions: Options = {
    key: 'yomtor',
    prepend: true
}

export const { getCache } = (() => {
    let cache: EmotionCache
    let _key = defaultCacheOptions.key

    function _getCache(options?: Options) {
        if (cache === undefined || _key !== options?.key) {
            _key = options?.key || 'yomtor'
            cache = createCache(options || defaultCacheOptions)
        }

        return cache
    }

    return { getCache: _getCache }
})()

export function useEmotionCache() {
    const options = useYomtorEmotionOptions()
    return getCache(options)
}
