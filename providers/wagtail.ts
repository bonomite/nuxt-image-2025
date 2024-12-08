import { withBase, joinURL } from 'ufo'
import type { ProviderGetImage } from '@nuxt/image'
import { createOperationsGenerator } from '#image'

export const getImage: ProviderGetImage = (
    src,
    { modifiers = {}, baseURL } = {}
) => {
    const {
        width = '0',
        height = '0',
        focusZoom = '0',
        format = 'webp',
        quality = '70',
    } = modifiers

    if (!baseURL) {
        // also support runtime config 
        baseURL = useRuntimeConfig().public.publisherBaseUrl
    }
    const doFill = width !== '0' && height !== '0'
    const doWidth = width !== '0' && height === '0'
    const doHeight = width === '0' && height !== '0'
    const doOriginal = width === '0' && height === '0'

    const formatting = `|format-${format}|${format}quality-${quality}`
    const options = joinURL(
        doFill ? `fill-${width}x${height}-c${focusZoom}${formatting}` : '',
        doWidth ? `width-${width}${formatting}` : '',
        doHeight ? `height-${height}${formatting}` : '',
        doOriginal ? `original${formatting}` : '',
    )

    const url = withBase(joinURL(src, options), baseURL)
    //console.log("url", url)
    return {
        url,
    }
}
