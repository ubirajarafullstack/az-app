import React from "react";
import SwiperCore from "swiper";

// Import the modules you need
import { Mousewheel, Keyboard, Pagination, Navigation, HashNavigation, FreeMode, Thumbs } from 'swiper/modules';

// Define a custom hook that takes the swiper options as an argument
function useSwiper(options: any) {
  // Create a state variable to store the swiper instance
  const [swiper, setSwiper] = React.useState<any>(null);

  // Create a ref to store the swiper container element
  const swiperRef = React.useRef(null);

  // Use the useEffect hook to create the swiper instance when the component mounts
  React.useEffect(() => {
    // Check if the swiper ref is not null
    if (swiperRef.current) {
      // Create a new swiper instance with the options and the ref
      const newSwiper = new SwiperCore(swiperRef.current, options);

      // Set the swiper state with the new instance
      setSwiper(newSwiper);
    }
  }, [options]);

  // Return the swiper instance and the ref
  return [swiper, swiperRef];
}

export default useSwiper;

/*
//begin
  // Create a ref object to store the Swiper instance
  const swiperRef = useRef<SwiperRef>(null);

  // Use the onSwiper prop to get the Swiper instance and assign it to the ref object
  const onSwiper = (swiper: any) => {
    swiperRef.current = swiper;
  };

  // Use the swiperRef.current to access the Swiper instance from other components or functions
  const onSlideChange = (swiper: any) => {
    // Do something with swiperRef.current
    console.log(swiperRef.current);
  };

  // Render the Swiper component with the options and props
  return (
    <Swiper {...options} onSwiper={onSwiper} onSlideChange={onSlideChange}>
      ...
    </Swiper>
  );
//end

const onSlideChange = (swiper: any) => teste(Number(swiper.element.dataset.swiperSlideIndex));

//

// Import the Controller module from swiper/modules
import { Controller } from 'swiper/modules';

// Create a main swiper instance with the main options
let mainSwiper = new Swiper('.main', mainOptions);

// Create a gallery swiper instance with the gallery options
let gallerySwiper = new Swiper('.gallery', galleryOptions);

// Create a thumbs swiper instance with the thumbs options
let thumbsSwiper = new Swiper('.thumbs', thumbsOptions);

// Use the controller module to link the swipers together
mainSwiper.controller.control = [gallerySwiper, thumbsSwiper];
gallerySwiper.controller.control = thumbsSwiper;
thumbsSwiper.controller.control = gallerySwiper;

// Use the controller.by property to specify which swiper controls the other
mainSwiper.controller.by = 'container';
gallerySwiper.controller.by = 'slide';
thumbsSwiper.controller.by = 'slide';

//

// Create a main swiper instance with the main options
let mainSwiper = new Swiper('.main', mainOptions);

// Use the getNestedInstance method to get a nested swiper instance by index
let gallerySwiper = mainSwiper.getNestedInstance(0); // Get the first nested swiper
let thumbsSwiper = mainSwiper.getNestedInstance(1); // Get the second nested swiper

//

// Create a gallery swiper instance with the gallery options
let gallerySwiper = new Swiper('.gallery', galleryOptions);

// Create a thumbs swiper instance with the thumbs options
let thumbsSwiper = new Swiper('.thumbs', thumbsOptions);

// Use the onSlideChange event to update the thumbs swiper when the gallery swiper changes
gallerySwiper.on('slideChange', function () {
  // Get the active index of the gallery swiper
  let activeIndex = this.activeIndex;
  // Update the thumbs swiper options with the new active index
  thumbsSwiper.update({
    initialSlide: activeIndex,
    loop: true,
    spaceBetween: 8,
    slidesPerView: 3.2,
    freeMode: true,
    watchSlidesProgress: true,
  });
});

// Use the onSlideChange event to update the gallery swiper when the thumbs swiper changes
thumbsSwiper.on('slideChange', function () {
  // Get the active index of the thumbs swiper
  let activeIndex = this.activeIndex;
  // Update the gallery swiper options with the new active index
  gallerySwiper.update({
    initialSlide: activeIndex,
    loop: true,
    autoHeight: false,
    mousewheel: true,
    keyboard: true,
    nested: true,
    spaceBetween: 1,
    thumbs: {
      swiper: thumbsSwiper
    },
  });
});

//

const gOnSlideChange = (swiper: any) => {
  // Get the active index of the gallery swiper
  let activeIndex = swiper.activeIndex;
  // Get the thumbs swiper instance from the ref object
  let tSwiper = tSwiperRef.current;
  // Update the thumbs swiper options with the new active index
  tSwiper?.update({
    initialSlide: activeIndex,
    loop: true,
    spaceBetween: 8,
    slidesPerView: 3.2,
    freeMode: true,
    watchSlidesProgress: true,
  });
};

const tOnSlideChange = (swiper: any) => {
  // Get the active index of the thumbs swiper
  let activeIndex = swiper.activeIndex;
  // Get the gallery swiper instance from the ref object
  let gSwiper = gSwiperRef.current;
  // Update the gallery swiper options with the new active index
  gSwiper?.update({
    initialSlide: activeIndex,
    loop: true,
    autoHeight: false,
    mousewheel: true,
    keyboard: true,
    nested: true,
    spaceBetween: 1,
    thumbs: {
      swiper: tSwiperRef.current
    },
  });
};

//

// first 

// Disable the gallery swiper on mount
const gOnSwiper = (swiper: any) => {
  swiper.disable();
};

// Disable the thumbs swiper on mount
const tOnSwiper = (swiper: any) => {
  swiper.disable();
};

// Render the gallery and thumbs swipers with the options and props
return (
  <div>
    <Swiper {...galleryOptions} onSwiper={gOnSwiper}>
      ...
    </Swiper>
    <Swiper {...thumbsOptions} onSwiper={tOnSwiper}>
      ...
    </Swiper>
  </div>
);

// second

// Import the useState and useEffect hooks from React
import { useState, useEffect } from 'react';

// Create a state variable for the data
const [data, setData] = useState<any>(null);

// Use the useEffect hook to fetch the data
useEffect(() => {
  // Define an async function to fetch the data
  async function fetchData() {
    // Fetch some data from an API or a local source
    let data = await ...;
    // Update the data state with the data
    setData(data);
  }
  // Call the async function
  fetchData();
}, []); // Pass an empty array as the dependency array

// third

// Use another useEffect hook to enable and update the swipers after the data is fetched
useEffect(() => {
  // Check if the data is not null or undefined
  if (data) {
    // Get the gallery and thumbs swipers instances from their ref objects
    let gSwiper = gSwiperRef.current;
    let tSwiper = tSwiperRef.current;
    // Enable and update the gallery swiper with its options and data
    gSwiper?.enable();
    gSwiper?.update({
      ...galleryOptions,
      slides: data.gallerySlides,
      thumbs: { swiper: tSwiper },
    });
    // Enable and update the thumbs swiper with its options and data
    tSwiper?.enable();
    tSwiper?.update({
      ...thumbsOptions,
      slides: data.thumbsSlides,
      thumbs: { swiper: gSwiper },
    });
  }
}, [data]); // Pass the data state variable as a dependency array

//

// first 

const [galleryContainer, setGalleryContainer] = useState<any>({});
const [thumbsContainer, setThumbsContainer] = useState<any>({});

// ...

const gOnSwiper = (swiper: any) => {
  // supondo que swiper tenha uma propriedade id que corresponde ao id do produto
  setGalleryContainer((prev: any) => ({ ...prev, [swiper.id]: swiper }));
  swiper.disable();
};

const tOnSwiper = (swiper: any) => {
  // supondo que swiper tenha uma propriedade id que corresponde ao id do produto
  setThumbsContainer((prev: any) => ({ ...prev, [swiper.id]: swiper }));
  swiper.disable();
};

// second

const getGallerySwiper = useCallback(
  (id: string) => {
    return galleryContainer[id];
  },
  [galleryContainer]
);

const getThumbsSwiper = useCallback(
  (id: string) => {
    return thumbsContainer[id];
  },
  [thumbsContainer]
);

// third

const galleryOptions: SwiperOptions = {
  ...commonOptions,
  pagination: false,
  watchSlidesProgress: true,
  nested: true,
  controller: { control: getThumbsSwiper(product.id) }, // passa a referência do swiper dos thumbs correspondente ao produto
};

const thumbsOptions: SwiperOptions = {
  ...commonOptions,
  direction: 'vertical',
  spaceBetween: 10,
  slidesPerView: 3,
  pagination: false,
  mousewheel: false,
  keyboard: false,
  freeMode: true,
  watchSlidesProgress: true,
  controller: { control: getGallerySwiper(product.id), by: "container" }, // passa a referência do swiper da galeria correspondente ao produto e define o modo de controle por container
};


*/