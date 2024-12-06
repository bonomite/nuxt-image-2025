<script setup>
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

const nprImage = "348477"
</script>
<template>
  <div>
    <p>local:</p>
    <VImage src="/raven_phoenix_mix.jpg" :width="200" :height="200" />
    <p>wagtail:</p>
    <VImage src="348477" />
    <p>publisher:</p>
    <VImage src="/2024/12/GettyImages-2162463514.jpg" />
    <!-- <p>npr:</p>
    <VImage src="348477" />  -->
  </div>
</template>
