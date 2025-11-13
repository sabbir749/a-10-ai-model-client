import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css';
import { useLoaderData } from 'react-router';


const Slider = () => {

    const data = useLoaderData()
    const reducedData = data.slice(0, 4)
    console.log(data); 

    return (
        <div>
            <Swiper
                spaceBetween={0}
                modules={[Pagination, Autoplay, A11y]}
                slidesPerView={1}
                pagination={{ clickable: true }}
                loop={true}
                speed={1000}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                
                centeredSlides={true}    
            
                className="relative"
            >

                {reducedData.map(model => <SwiperSlide>
                    <div className="relative w-100% h-screen ">
                        <img src={model.image} alt="plant" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/70"></div>

                        <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center text-white text-xl font-semibold">
                            <h2 className='font-black text-4xl  text-[#ffff]'>{model.name}  </h2>
                    <div className='flex gap-8'>
                              <p className='text-base font-bold text-gray-300 text-center'>{model.dataset}</p>
                            <p className='text-base font-bold text-gray-300 text-center'>{model.framework}</p>
                    </div>
                            <p className='text-base text-gray-300 font-normal text-center'>{model.description}</p>
                        </div>
                    </div>
                </SwiperSlide>)}
            </Swiper>
        </div>
    );
};

export default Slider;