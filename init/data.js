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
      photos: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHRyYXZlbHxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWxzfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGhvdGVsc3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1vdW50YWlufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2t5JTIwdmFjYXRpb258ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1605892028552-b561b58d6c3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHBsdW5nJTIwbG9nZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1604529394017-7be5a35b2df9?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfGVufDB8fDB8fHww&ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1571695090730-cbd11c2d9fd7?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfGVufDB8fDB8fHww&ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1571703404-20bc3d54d9bb?ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG9zdGVsfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1584723017745-2fc63f7b0792?ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfGVufDB8fDB8fHww&ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
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
      photos: "https://images.unsplash.com/photo-1535568239-d94c7b9c33b1?ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjl8fGJveXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
      contact: {
        name: "Sourabh",
        phone: "1234567891",
        email: ""
      }
    }
  ];

    module.exports = { data: rentalData };