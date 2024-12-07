<script setup>
const findImageUrl = (item, nprImageType) => {
  try {
    let imageUrl = null
    for (const asset of Object.values(item.resources[0].assets)) {
      if (asset.profiles[0]?.href === "/v1/profiles/image") {
        const imageEnclosure = asset.enclosures.find((enclosure) =>
          enclosure.rels.includes(nprImageType)
        )
        if (imageEnclosure) {
          imageUrl = {
            raw: imageEnclosure.href,
            template: imageEnclosure.hrefTemplate,
            width: imageEnclosure.width,
            height: imageEnclosure.height,
          }
          break // Exit the loop once the matching image URL is found
        }
      }
    }
    return imageUrl
  } catch (e) {
    console.error("findImageUrl error = ", e)
    return null
  }
}

const imageNormalizer = (imgObj, provider, nprImageType = "image-square") => {
  let src = ""
  let credit = null
  let creditLink = null
  let alt = null
  let width = 0
  let height = 0
  switch (provider) {
    case undefined:
      src = imgObj.src
    case "wagtail":
      src = imgObj.id
      raw = imgObj.file
      width = imgObj.width
      height = imgObj.height
      credit = imgObj.credit
      creditLink = imgObj.creditLink
      alt = imgObj.alt
    case "publisher":
      src = imgObj.name
      raw = imgObj.url
      width = imgObj.w
      height = imgObj.h
      credit = `Photo by ${imgObj.creditsName}${
        imgObj.source.name ? `/${imgObj.source.name}` : ""
      }`
      creditLink = imgObj.creditsUrl
      alt = imgObj.altText
    case "npr":
      const nprImageVersion = findImageUrl(imgObj, nprImageType)
      src = nprImageVersion.template
      raw = nprImageVersion.raw
      width = nprImageVersion.width
      height = nprImageVersion.height
      credit = `Photo by ${imgObj.producer}${
        imgObj.provider ? `/${imgObj.provider}` : ""
      }`
      creditLink = imgObj.creditsUrl
      alt = imgObj.altText

    default:
      src = imgObj.src
  }

  return {
    id: imgObj.id,
    src,
    alt,
    provider,
    width: imgObj.width ?? imgObj.w,
    height: imgObj.height ?? imgObj.h,
    caption: imgObj.caption,
    credit,
    creditLink,
    raw: imgObj.file ?? imgObj.url,
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
      rels: [Array],
      type: "image/jpeg",
      width: 5336,
    },
    {
      height: 2508,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4461x2508+1539+0/resize/4461x2508!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4461x2508+1539+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: [Array],
      type: "image/jpeg",
      width: 4461,
    },
    {
      height: 4000,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4002x4000+1998+0/resize/4002x4000!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/4002x4000+1998+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: [Array],
      type: "image/jpeg",
      width: 4002,
    },
    {
      height: 4000,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x4000+0+0/resize/6000x4000!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x4000+0+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: [Array],
      type: "image/jpeg",
      width: 6000,
    },
    {
      height: 2759,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x2759+0+0/resize/6000x2759!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x2759+0+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: [Array],
      type: "image/jpeg",
      width: 6000,
    },
    {
      height: 4000,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3000x4000+2129+0/resize/3000x4000!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/3000x4000+2129+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: [Array],
      type: "image/jpeg",
      width: 3000,
    },
    {
      height: 4000,
      href:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x4000+0+0/resize/6000x4000!/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      hrefTemplate:
        "https://npr.brightspotcdn.com/dims3/default/strip/false/crop/6000x4000+0+0/resize/{width}/quality/{quality}/format/{format}/?url=http%3A%2F%2Fnpr-brightspot.s3.amazonaws.com%2F3f%2F75%2F8c438eab4a9eadbc912bdec9d47f%2F2551-d133-00142r.jpg",
      rels: [Array],
      type: "image/jpeg",
      width: 6000,
    },
  ],
}
</script>
<template>
  <div>
    <p>local:</p>
    <VImage src="/raven_phoenix_mix.jpg" />
    <p>wagtail:</p>
    <VImage
      :src="wagtailImage.id"
      :alt="wagtailImage.alt"
      width="600"
      height="100"
      provider="wagtail"
    />
    <p>publisher:</p>
    <VImage src="/2024/12/GettyImages-2162463514.jpg" provider="publisher" />
    <!-- <p>npr:</p>
    <VImage src="348477" />  -->
  </div>
</template>
