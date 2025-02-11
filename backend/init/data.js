const rentalData = [
    {
      title: "Spacious PG Near City Center",
      description: "Fully furnished PG with easy access to all amenities and public transportation.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "101 Main Street, Indore"
      },
      price: 7500,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://content.jdmagicbox.com/comp/indore/x5/0731px731.x731.150609200023.l1x5/catalogue/fully-furnished-rooms-on-rent-nakshatra-road-indore-paying-guest-accommodation-for-men-4jza7zq.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Budget-Friendly Hostel for Boys",
      description: "Affordable and secure boys' hostel with basic amenities and nearby eateries.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "202 Station Road, Indore"
      },
      price: 4500,
      propertyType: "Hostel",
      facilities: "",
      photos:{
        url:"https://gsh-cdn.sgp1.cdn.digitaloceanspaces.com/assets/img/no-broker-indore/PRT844/room-on-rent-in-indore/pg-in-new-gayatri-nagar_1713342556.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Girls PG with Gym Facilities",
      description: "Secure PG for girls with in-house gym and study rooms. Ideal for fitness enthusiasts.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "303 Green Park Colony, Indore"
      },
      price: 8500,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1641234367/Website/CMS-Uploads/zvwxskz5utrjxxyqxebn.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Affordable PG Near Shopping District",
      description: "Well-furnished PG in a bustling area with quick access to shopping and dining options.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "404 Market Street, Indore"
      },
      price: 6000,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://gsh-cdn.sgp1.cdn.digitaloceanspaces.com/assets/img/no-broker-indore/PRT850/room-on-rent-in-indore/pg-in-new-gayatri-nagar_1713343479.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Modern Hostel for Boys Near University",
      description: "Newly built hostel with modern facilities and close to the university campus.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "505 University Lane, Indore"
      },
      price: 7000,
      propertyType: "Hostel",
      facilities: "",
      photos:{
        url:"https://gsh-cdn.sgp1.cdn.digitaloceanspaces.com/assets/img/no-broker-indore/PRT841/room-on-rent-in-indore/pg-in-new-gayatri-nagar_1713339219.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Luxury PG with AC and Wi-Fi",
      description: "Fully furnished luxury PG with air conditioning, high-speed Wi-Fi, and attached bathrooms.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "606 City Square, Indore"
      },
      price: 9500,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1655465539/Website/CMS-Uploads/da1lhffljx9bwndle3db.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Economical Hostel Near Railway Station",
      description: "Budget-friendly hostel within walking distance of the railway station.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "707 Railway Road, Indore"
      },
      price: 5000,
      propertyType: "Hostel",
      facilities: "",
      photos:{
        url:"https://gsh-cdn.sgp1.cdn.digitaloceanspaces.com/assets/img/no-broker-mumbai/PRT555/room-on-rent-in-mumbai/pg-in-santacruz-east_1722852861.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Girls PG with 24/7 Security",
      description: "Safe and secure girls' PG with round-the-clock security and essential facilities.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "808 Safety Lane, Indore"
      },
      price: 7500,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1657107830/Website/CMS-Uploads/hhx4llhif8zrc49tjq2b.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "PG Near IT Park with Easy Commute",
      description: "Perfect for IT professionals with easy access to the tech park and transport.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "909 Tech Road, Indore"
      },
      price: 7800,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1663822622/Website/CMS-Uploads/c6hdh58d28xmmver5f3d.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Cozy Hostel for Boys Near Market",
      description: "Hostel with easy access to local markets and affordable dining options.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "1010 Bazaar Lane, Indore"
      },
      price: 5500,
      propertyType: "Hostel",
      facilities: "",
      photos:{
        url:"https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/center/cover_photo/64c7c1e40fe9100001f8e41f/7___2024_07_09T175023.678.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Luxury PG with Swimming Pool Access",
      description: "High-end PG with swimming pool access, gym, and all modern amenities.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "1111 Poolside Avenue, Indore"
      },
      price: 12000,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://content.jdmagicbox.com/comp/visakhapatnam/p6/0891px891.x891.140613103206.e8p6/catalogue/sri-krishna-pg-mvp-colony-visakhapatnam-hostels-w10kq4qpmo.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Girls PG Near Shopping Mall",
      description: "Conveniently located near a shopping mall with spacious rooms and common areas.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "1212 Mall Street, Indore"
      },
      price: 9000,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1613039998/Website/CMS-Uploads/obn49sqg8hawtm15esaz.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Affordable Hostel Near College",
      description: "Hostel for students within a short walking distance to college with basic facilities.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "1313 College Avenue, Indore"
      },
      price: 4500,
      propertyType: "Hostel",
      facilities: "",
      photos:{
        url:"https://play-zelo-production.s3.ap-south-1.amazonaws.com/uploads/center/cover_photo/5d9ae2b309ba997ff97ea0bc/Zolo_Mystique_PG_in_Andheri_West_.jpeg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Luxury PG with Housekeeping Services",
      description: "Luxury PG with regular housekeeping and attached bathrooms.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "1414 Luxury Lane, Indore"
      },
      price: 11000,
      propertyType: "PG",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/f_auto,q_auto/v1657442622/Website/CMS-Uploads/qdxq0bsjjxw4z7isyru5.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    },
    {
      title: "Hostel with Gym Access for Students",
      description: "Student-friendly hostel with gym access and proximity to recreational facilities.",
      location: {
        state: "Madhya Pradesh",
        pincode: "123456",
        address: "1515 Sports Road, Indore"
      },
      price: 5800,
      propertyType: "Hostel",
      facilities: "",
      photos:{
        url:"https://res.cloudinary.com/stanza-living/image/upload/f_auto,q_auto,w_600/e_improve/e_sharpen:10/e_saturation:10/v1684132188/Website/CMS-Uploads/1_tkbh1q.jpg",
        filename:"rentalImage",
      },
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    }
  ];

    module.exports = { data: rentalData };