<script setup>
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

const imageNormalizer = (imgObj, nprImageType = "standard") => {
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
      credit = `Photo by ${imgObj.creditsName}${
        imgObj.source?.name ? `/${imgObj.source.name}` : ""
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
      credit = `Photo by ${imgObj.producer}${
        imgObj.provider ? `/${imgObj.provider}` : ""
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

const wagtailImage = {
  id: 348546,
  title: "GettyImages-2188232134.jpg",
  width: 6000,
  height: 4000,
  createdAt: "2024-12-05T17:30:19.481067-05:00",
  focalPointX: null,
  focalPointY: null,
  focalPointWidth: null,
  focalPointHeight: null,
  fileSize: 3375718,
  fileHash: "1cf9246a89c5f22e423cb57750b1daf637fd7f79",
  alt:
    "Daniel Penny, who is charged in the death of Jordan Neely, walks into a New York City courthouse as the jury begins the second day of deliberations on December 04, 2024 in New York City. Penny, 26, a former Marine, is charged in the death of Jordan Neely on a New York City subway by choking him after an altercation involving panhandling on the train car.",
  caption:
    "Daniel Penny, who is charged in the death of Jordan Neely, walks into a New York City courthouse as the jury begins the second day of deliberations on December 04, 2024 in New York City. Penny, 26, a former Marine, is charged in the death of Jordan Neely on a New York City subway by choking him after an altercation involving panhandling on the train car.",
  credit: "Photo by Spencer Platt/Getty Images",
  creditLink: "",
  file: "https://images-prod.gothamist.com/original_images/GettyImages-2188232134.jpg",
  usageLimitations: "",
  expiryDate: null,
  collection: 1,
  uploadedByUser: 128,
}

const publisherImage = {
  altText: "",
  name: "2024/12/GettyImages-2188236735.jpg",
  source: { url: "", name: "Getty Images" },
  url: "https://media.wnyc.org/i/1024/690/c/80/2024/12/GettyImages-2188236735.jpg",
  h: 690,
  isDisplay: true,
  crop: "c",
  caption:
    "A transgender rights supporter takes part in a rally outside of the U.S. Supreme Court as the high court hears arguments in a case on transgender health rights on December 04, 2024 in Washington, DC. ",
  creditsUrl: "",
  template: "https://media.wnyc.org/i/%s/%s/%s/%s/2024/12/GettyImages-2188236735.jpg",
  w: 1024,
  id: 228628,
  creditsName: "Kevin Dietsch",
}

const nprImage = {
  altText:
    "Wicked tells the origin story of Elphaba, the Wicked Witch of the West (Cynthia Erivo), and her friendship with Galinda, who becomes Glinda the Good (Ariana Grande).",
  caption:
    "<em>Wicked </em>tells the origin story of Elphaba, the Wicked Witch of the West (Cynthia Erivo), and her friendship with Galinda, who becomes Glinda the Good (Ariana Grande).",
  displaySize: "large",
  id: "g-s1-34905",
  isRestrictedToAuthorizedOrgServiceIds: false,
  producer: "Giles Keyte",
  profiles: [
    { href: "/v1/profiles/document" },
    { href: "/v1/profiles/image", rels: [Array] },
  ],
  provider: "Universal Pictures",
  title: "WICKED",
  enclosures: [
    {
      height: 4000,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5336x4000+664+0/resize/5336x4000!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/5336x4000+664+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: ["image-standard", "primary", "scalable"],
      type: "image/jpeg",
      width: 5336,
    },
    {
      height: 2508,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4461x2508+1539+0/resize/4461x2508!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4461x2508+1539+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: ["image-wide", "primary", "scalable"],
      type: "image/jpeg",
      width: 4461,
    },
    {
      height: 4000,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4002x4000+1998+0/resize/4002x4000!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4002x4000+1998+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: ["image-square", "primary", "scalable"],
      type: "image/jpeg",
      width: 4002,
    },
  ],
}

//console.log("wagtailImageNormalized = ", wagtailImageNormalized)
</script>
<template>
  <div>
    <p>local:</p>
    <VImage src="/raven_phoenix_mix.jpg" />
    <p>wagtail:</p>
    <VImage :src="imageNormalizer(wagtailImage)" width="600" height="100" />
    <p>wagtail raw:</p>
    <VImage :src="imageNormalizer(wagtailImage)" />
    <p>publisher:</p>
    <VImage :src="imageNormalizer(publisherImage)" width="600" height="100" />
    <p>publisher raw:</p>
    <VImage :src="imageNormalizer(publisherImage)" />
    <p>npr W:</p>
    <VImage :src="imageNormalizer(nprImage)" width="300" />
    <p>npr W & H (can't have a custom ratio):</p>
    <VImage :src="imageNormalizer(nprImage)" width="300" height="50" />
    <p>npr raw:</p>
    <VImage :src="imageNormalizer(nprImage)" />
    <p>npr square:</p>
    <VImage :src="imageNormalizer(nprImage, 'square')" width="300" />
    <p>npr wide:</p>
    <VImage :src="imageNormalizer(nprImage, 'wide')" width="300" />
  </div>
</template>
