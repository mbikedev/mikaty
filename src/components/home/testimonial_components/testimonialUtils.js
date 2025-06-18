import TestimonialProfile1 from '@/assets/images/testimonials1.webp';
import TestimonialProfile2 from '@/assets/images/testimonials2.webp';
import TestimonialProfile3 from '@/assets/images/testimonials3.webp';
import TestimonialProfile4 from '@/assets/images/testimonials4.webp';
import TestimonialProfile5 from '@/assets/images/testimonials5.webp';
import TestimonialProfile6 from '@/assets/images/testimonials6.webp';
import TestimonialProfile7 from '@/assets/images/testimonials7.webp';
import TestimonialProfile8 from '@/assets/images/testimonials8.webp';
import TestimonialProfile9 from '@/assets/images/testimonials9.webp';
import TestimonialProfile10 from '@/assets/images/testimonials10.webp';


export const extractAndFormatNameFromUrl = (imageUrl) => {
  if (!imageUrl) return "Client";
  try {
    const fileNameWithExtension = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
    const fileName = fileNameWithExtension.substring(0, fileNameWithExtension.lastIndexOf('.'));
    
    if (!fileName) return "Client";

    const words = fileName.split(/[-_ %20]/).filter(Boolean); 
    if (words.length === 0) return "Client";

    const firstName = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();
    if (words.length === 1) return firstName;

    const lastName = words[1].charAt(0).toUpperCase() + (words[1].length > 1 ? words[1].slice(1).toLowerCase() : '.');
    
    return `${firstName} ${lastName}`;
  } catch (error) {
    return "Client";
  }
};

export const testimonialsDataSource = [
  { 
    nameKey: "testimonial1Name", 
    feedbackKey: "testimonial1Feedback", 
    rating: 5,
    altTextKey: "testimonial1Name" ,
    image:'testimonials1'
  },
  { 
    nameKey: "testimonial2Name", 
    feedbackKey: "testimonial2Feedback", 
    rating: 5,
    altTextKey: "testimonial2Name",
    image:'testimonials2'
  },
  { 
    nameKey: "testimonial3Name", 
    feedbackKey: "testimonial3Feedback", 
    rating: 5,
    altTextKey: "testimonial3Name" ,
    image:'testimonials3'
  },
  {
    nameKey: "testimonial4Name",
    feedbackKey: "testimonial4Feedback",
    rating: 5,
    altTextKey: "testimonial4Name",
    image:'testimonials4'
  },
  {
    nameKey: "testimonial5Name",
    feedbackKey: "testimonial5Feedback",
    rating: 4,
    altTextKey: "testimonial5Name",
    image:'testimonials5'
  },
  {
    nameKey: "testimonial6Name",
    feedbackKey: "testimonial6Feedback",
    rating: 5,
    altTextKey: "testimonial6Name",
    image:'testimonials6'
  },
  {
    nameKey: "testimonial7Name",
    feedbackKey: "testimonial7Feedback",
    rating: 5,
    altTextKey: "testimonial7Name",
    image:'testimonials7'
  },
  {
    nameKey: "testimonial8Name",
    feedbackKey: "testimonial8Feedback",
    rating: 4,
    altTextKey: "testimonial8Name",
    image:'testimonials8'
  },
  {
    nameKey: "testimonial9Name",
    feedbackKey: "testimonial9Feedback",
    rating: 5,
    altTextKey: "testimonial9Name",
    image:'testimonials9'
  },
  {
    nameKey: "testimonial10Name",
    feedbackKey: "testimonial10Feedback",
    rating: 5,
    altTextKey: "testimonial10Name",
    image:'testimonials10'
  }
];

export const newImageUrlsSource = [
  TestimonialProfile1,
  TestimonialProfile2,
  TestimonialProfile3,
  TestimonialProfile4,
  TestimonialProfile5,
  TestimonialProfile6,
  TestimonialProfile7,
  TestimonialProfile8,
  TestimonialProfile9,
  TestimonialProfile10
];
