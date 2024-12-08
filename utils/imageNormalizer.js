const getNprImage = (item, nprImageType) => {
    console.log("getting npr image")
    try {
        let imageUrl = null

        const imageEnclosure = item.enclosures.find((enclosure) =>
            // image-standard
            // image-square
            // image-wide
            // image-enlargement
            // image-custom
            // image-brick
            // image-vertical
            // image-slide
            enclosure.rels.includes(`image-${nprImageType}`)
        )
        if (imageEnclosure) {
            imageUrl = {
                raw: imageEnclosure.href,
                template: imageEnclosure.hrefTemplate,
                width: imageEnclosure.width,
                height: imageEnclosure.height,
            }
        }

        //console.log("imageUrl = ", imageUrl)
        return imageUrl
    } catch (e) {
        console.error("getNprImage error = ", e)
        return null
    }
}

const cmsSources = {
    NPR: "npr",
    PUBLISHER: "publisher",
    WAGTAIL: "wagtail",
}

// determines the CMS source of an image
const getProvider = (imgObj) => {
    if (typeof imgObj === "string") {
        // is IPX pass undefined
        return undefined
    } else if (imgObj.enclosures) {
        return cmsSources.NPR
    } else if (imgObj.template?.includes("media.wnyc.org")) {
        return cmsSources.PUBLISHER
    } else {
        return cmsSources.WAGTAIL
    }
}

export const imageNormalizer = (imgObj, nprImageType = "standard") => {
    const provider = getProvider(imgObj)
    console.log("provider = ", provider)
    let src = ""
    let credit = null
    let creditLink = null
    let alt = null
    let width = 0
    let height = 0
    let raw = ""
    switch (provider) {
        case undefined:
            src = imgObj.src
            break
        case "wagtail":
            src = String(imgObj.id)
            raw = imgObj.file
            width = imgObj.width
            height = imgObj.height
            credit = imgObj.credit
            creditLink = imgObj.creditLink
            alt = imgObj.alt
            break
        case "publisher":
            src = imgObj.name
            raw = imgObj.url
            width = imgObj.w
            height = imgObj.h
            credit = `Photo by ${imgObj.creditsName}${imgObj.source?.name ? `/${imgObj.source.name}` : ""
                }`
            creditLink = imgObj.creditsUrl
            alt = imgObj.altText
            break
        case "npr":
            const nprImageVersion = getNprImage(imgObj, nprImageType)
            src = nprImageVersion?.template
            raw = nprImageVersion?.raw
            width = nprImageVersion?.width
            height = nprImageVersion?.height
            credit = `Photo by ${imgObj.producer}${imgObj.provider ? `/${imgObj.provider}` : ""
                }`
            creditLink = imgObj.creditsUrl
            alt = imgObj.altText
            break
        default:
            src = imgObj.src
            break
    }

    return {
        id: String(imgObj.id),
        src,
        alt,
        provider,
        width,
        height,
        caption: imgObj.caption,
        credit,
        creditLink,
        raw,
    }
}