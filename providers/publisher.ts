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

    const options = joinURL(
        doFill ? `i/${width}/${height}/c/${quality}` : '',
        doWidth ? `i/${width}/0/c/${quality}` : '',
        doHeight ? `i/0/${height}/c/${quality}` : '',
        doOriginal ? `i/0/0/c/${quality}` : '',
    )
    const url = withBase(joinURL(options, src), baseURL)

    return {
        url,
    }
}
