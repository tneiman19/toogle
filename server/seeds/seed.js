const db = require("../config/connection");
const { Category, User, Service, Order } = require("../models");
const categorySeeds = require("./categorySeeds.json");
const userSeeds = require("./userSeeds.json");

const seedDatabase = async () => {
  try {
    // Delete existing data from the Category, User, and Service collections
    await Promise.all([
      Category.deleteMany(),
      User.deleteMany(),
      Service.deleteMany(),
      Order.deleteMany(),
    ]);

    // Seed the database with the category data
    const [catData, userData] = await Promise.all([
      Category.insertMany(categorySeeds),
      User.create(userSeeds),
    ]);
    // console.log(catData, userData);

    // Insert services
    const services = await Service.insertMany([
      //Popular Services
      {
        serviceName: "Build Shelving",
        serviceDesc:
          "As a skilled professional, I offer top-quality shelving assembly services for bedroom closets. I specialize in assembling custom shelving units using high-quality materials. I will carefully measure and mark the closet walls, attach sturdy support brackets, and expertly secure the shelves in place. Rest assured, I have the necessary tools and expertise to complete the job efficiently and to your satisfaction.",
        serviceCategory: catData[0]._id,
        servicePrice: 45.67,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Ceiling Fan Installation",
        serviceDesc:
          "With my extensive experience in ceiling fan installation, I provide reliable and efficient services for installing ceiling fans in bedrooms. I will mount the fan securely on the ceiling, handle the wiring connections with utmost care, and ensure proper attachment of the fan blades. Your satisfaction and safety are my top priorities, and I guarantee a professional installation that will enhance the comfort of your bedroom.",
        serviceCategory: catData[1]._id,
        servicePrice: 50.99,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Leaky Faucet Repair",
        serviceDesc:
          "As an experienced plumber, I specialize in efficient and effective leaky faucet repairs. I will meticulously diagnose the cause of the leak and proceed with the necessary repairs. From disassembling the faucet to inspecting and replacing faulty components, I will restore your bathroom faucet to perfect working condition. You can rely on my expertise and attention to detail for a long-lasting solution.",
        serviceCategory: catData[3]._id,
        servicePrice: 55.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Interior Painting",
        serviceDesc:
          "Transform your house with professional interior painting services. As an experienced painter, I will meticulously prepare the surfaces, including filling holes and cracks, applying primer, and applying multiple coats of high-quality paint. I take pride in delivering flawless results, ensuring smooth and even coverage on your walls and ceilings. Trust me to bring your vision to life and create a fresh, vibrant atmosphere in your home.",
        serviceCategory: catData[2]._id,
        servicePrice: 500.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Furniture Assembly

      {
        serviceName: "Furniture Assembly",
        serviceDesc:
          "With my expertise in furniture assembly, I provide professional services to assemble new furniture for the living room. Whether it's a sofa, coffee table, or entertainment center, I will carefully follow the instructions and use the necessary tools to ensure precise and sturdy assembly. Sit back and relax as I transform the separate parts into a beautiful and functional addition to your living space.",
        serviceCategory: catData[0]._id,
        servicePrice: 50.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Bed Frame Assembly",
        serviceDesc:
          "As an experienced professional, I specialize in bed frame assembly services. I will carefully follow the instructions and utilize the necessary tools to assemble your new bed frame. From attaching the headboard and footboard to securing the slats and supports, I will ensure a sturdy and stable bed frame that guarantees a comfortable night's sleep. Trust me to bring your bedroom furniture to life.",
        serviceCategory: catData[0]._id,
        servicePrice: 60.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Dining Table Assembly",
        serviceDesc:
          "Enhance your dining area with professional dining table and chairs assembly services. I have the skills and expertise to assemble various styles of dining tables and chairs, ensuring proper alignment, stability, and aesthetic appeal. With attention to detail, I will meticulously follow the assembly instructions to create a beautiful dining set where you can enjoy memorable meals with family and friends.",
        serviceCategory: catData[0]._id,
        servicePrice: 70.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Wardrobe Assembly",
        serviceDesc:
          "Assembling a new wardrobe can be a complex task, but as a skilled professional, I offer reliable wardrobe assembly services. With precision and attention to detail, I will follow the assembly instructions to create a functional and stylish wardrobe for your bedroom. From attaching the doors and drawers to ensuring proper alignment and stability, I guarantee a flawless assembly that meets your storage needs.",
        serviceCategory: catData[0]._id,
        servicePrice: 80.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Lighting Installation
      {
        serviceName: "Install Lighting Fixture",
        serviceDesc:
          "As a professional lighting installer, I offer reliable services to install a new lighting fixture in your living room. With meticulous attention to detail, I will handle the electrical connections and ensure the fixture is securely mounted and properly aligned. Whether it's a chandelier, pendant light, or recessed lighting, I will bring enhanced illumination and style to your living space with a seamless installation.",
        serviceCategory: catData[1]._id,
        servicePrice: 60.99,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Outdoor Lighting Installation",
        serviceDesc:
          "Illuminate your backyard with professional outdoor lighting installation services. With expertise in landscape lighting, I will strategically install outdoor lighting fixtures to enhance the aesthetics, security, and functionality of your outdoor space. Whether it's path lights, spotlights, or decorative string lights, I will carefully plan the layout and handle the wiring to create a captivating ambiance that extends your living area into the outdoors.",
        serviceCategory: catData[1]._id,
        servicePrice: 80.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Plumbing Services
      {
        serviceName: "Plumbing Services",
        serviceDesc:
          "As a professional plumber, I specialize in providing top-notch plumbing services to fix a leaking faucet in your kitchen. With extensive knowledge and experience, I will accurately diagnose the issue, repair any damaged components, and ensure proper functioning of the faucet. Rest assured that I use high-quality materials and employ efficient techniques to resolve the leak and prevent future water wastage, ensuring your kitchen remains dry and functional.",
        serviceCategory: catData[3]._id,
        servicePrice: 70.25,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Clogged Drain Repair",
        serviceDesc:
          "Don't let a clogged drain disrupt your daily routine. As an experienced plumber, I offer reliable clogged drain repair services to resolve the issue in your bathroom. Using professional tools and techniques, I will identify the cause of the clog and effectively remove it, restoring proper drainage. Whether it's a hair clog, soap residue, or other debris, I will ensure your bathroom drain functions smoothly, allowing you to enjoy hassle-free water flow.",
        serviceCategory: catData[3]._id,
        servicePrice: 65.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },

      //Carpentry and Woodworking

      {
        serviceName: "Hardwood and Laminate Plank Flooring Installation",
        serviceDesc:
          "As an experienced flooring installer, I specialize in the professional installation of new hardwood flooring in the living room. With attention to detail and precision, I will ensure that the flooring is properly laid, leveled, and finished to perfection. Whether it's hardwood or laminate planks, I have the expertise to handle the installation process efficiently and deliver exceptional results. Transform your living room with beautiful and durable flooring that will enhance the overall aesthetic of your home.",
        serviceCategory: catData[5]._id,
        servicePrice: 120.99,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Custom Furniture Building",
        serviceDesc:
          "Looking for a unique and personalized addition to your study room? As a skilled furniture builder, I specialize in creating custom pieces that perfectly match your style and requirements. Let me build a custom bookshelf for your study room, designed to accommodate your books, decor, and personal belongings. With high-quality materials and meticulous craftsmanship, I will bring your vision to life, creating a functional and aesthetically pleasing bookshelf that complements your study room's ambiance.",
        serviceCategory: catData[6]._id,
        servicePrice: 150.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Deck Construction",
        serviceDesc:
          "Enhance your outdoor living space with a stunning new deck in the backyard. As an expert deck builder, I offer professional construction services tailored to your specific requirements. From designing the layout to selecting the right materials, I will handle every aspect of the deck construction process. With careful attention to structural integrity and aesthetics, I will create a durable and visually appealing deck where you can relax, entertain, and enjoy the beauty of your outdoor surroundings.",
        serviceCategory: catData[6]._id,
        servicePrice: 2000.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Custom Cabinet Building",
        serviceDesc:
          "Transform your bathroom with custom-built cabinets that optimize storage and enhance functionality. As a skilled cabinet maker, I specialize in creating tailor-made cabinets designed to fit your bathroom's layout and style. From selecting the right materials to crafting the cabinets with precision, I will ensure every detail is taken care of. Experience the convenience of custom cabinets that provide ample space for toiletries, towels, and other essentials while adding a touch of elegance to your bathroom decor.",
        serviceCategory: catData[6]._id,
        servicePrice: 300.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },

      //Bathroom Remodeling

      {
        serviceName: "Shower Tiling",
        serviceDesc:
          "As a skilled tiler, I specialize in grouting and tiling bathroom showers. Enhance the look and functionality of your bathroom by giving your shower a fresh and modern upgrade. With attention to detail and precision, I will ensure that the tiles are expertly installed and the grout lines are clean and even. Transform your shower into a beautiful and inviting space with high-quality tiling work that adds durability and aesthetic appeal to your bathroom.",
        serviceCategory: catData[8]._id,
        servicePrice: 90.5,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Bathroom Vanity Installation",
        serviceDesc:
          "Upgrade your bathroom with a new vanity installation. As an experienced installer, I will ensure a seamless and professional installation process. From carefully aligning the vanity to securing it in place, I will pay attention to every detail to achieve a flawless result. Enjoy a functional and stylish bathroom with a new vanity that offers ample storage space and enhances the overall aesthetic of your bathroom decor.",
        serviceCategory: catData[8]._id,
        servicePrice: 250.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Toilet Replacement",
        serviceDesc:
          "Upgrade your bathroom with a new toilet installation. I specialize in replacing old, inefficient, or malfunctioning toilets with modern and water-efficient models. From disconnecting and removing the old toilet to installing and sealing the new one, I will ensure a smooth and reliable toilet replacement. Enjoy improved performance, water savings, and enhanced aesthetics with a new toilet that meets your needs and complements your bathroom design.",
        serviceCategory: catData[8]._id,
        servicePrice: 150.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Bathroom Lighting Installation",
        serviceDesc:
          "Illuminate your bathroom with new lighting fixtures. As a professional installer, I will expertly install the lighting fixtures to create a well-lit and inviting bathroom environment. Whether you need task lighting near the vanity or ambient lighting throughout the space, I will help you choose the right fixtures and strategically position them for optimal functionality and aesthetics. Transform your bathroom into a well-lit sanctuary with high-quality lighting installation services.",
        serviceCategory: catData[8]._id,
        servicePrice: 80.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },

      //Painting

      {
        serviceName: "Wallpaper Installation",
        serviceDesc:
          "As an experienced wallpaper installer, I specialize in transforming living spaces with beautiful wallpaper. Enhance the ambiance of your living room by adding stylish and eye-catching wallpaper. From meticulously preparing the walls to ensuring seamless installation and pattern matching, I will deliver a flawless result. Enjoy a unique and personalized living room with high-quality wallpaper installation services that reflect your taste and elevate the overall aesthetic of your home.",
        serviceCategory: catData[2]._id,
        servicePrice: 75.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Exterior Painting",
        serviceDesc:
          "Transform the exterior of your house with a fresh coat of paint. As a skilled painter, I specialize in exterior painting projects that breathe new life into your home. From proper surface preparation to using high-quality paints and finishes, I will ensure a durable and visually appealing result. Enhance your curb appeal and protect your home from the elements with professional exterior painting services tailored to your preferences and the architectural style of your house.",
        serviceCategory: catData[2]._id,
        servicePrice: 800.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Cabinet Painting",
        serviceDesc:
          "Revitalize your kitchen with a cabinet painting project. As an expert cabinet painter, I will transform your kitchen cabinets by providing a fresh and updated look. From proper surface preparation to achieving a smooth and durable finish, I will ensure that your cabinets receive the attention to detail they deserve. Enjoy a kitchen makeover without the cost of replacing cabinets by opting for professional cabinet painting services that breathe new life into your kitchen space.",
        serviceCategory: catData[2]._id,
        servicePrice: 200.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Trim Painting",
        serviceDesc:
          "Enhance the overall aesthetic of your home with professional trim and baseboard painting. As an experienced painter, I will meticulously paint the trim and baseboards, ensuring clean lines and a seamless finish. Whether you want to refresh the existing paint or completely change the color, I will provide attention to detail and precise techniques to achieve a polished and refined look. Elevate the visual appeal of your home with trim painting services that showcase the architectural details and add a touch of elegance to your space.",
        serviceCategory: catData[2]._id,
        servicePrice: 100.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Flooring Installation
      {
        serviceName: "Laminate Flooring Installation",
        serviceDesc:
          "Transform your kitchen with laminate flooring installation. As an experienced flooring installer, I specialize in providing high-quality laminate flooring solutions. From precise measurements to expert installation techniques, I will ensure a seamless and durable finish. Enjoy the beauty and functionality of laminate flooring in your kitchen, offering easy maintenance and a wide range of design options. Trust my expertise to deliver professional and reliable laminate flooring installation that enhances the appeal of your kitchen.",
        serviceCategory: catData[5]._id,
        servicePrice: 150.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Tile Flooring Installation",
        serviceDesc:
          "Create a stunning kitchen space with tile flooring installation. As a skilled flooring installer, I will transform your kitchen with beautiful and durable tile flooring. From preparing the surface to precise tile placement and grouting, I will ensure a flawless result. Enjoy the versatility, elegance, and easy maintenance of tile flooring in your kitchen. Whether you prefer classic ceramic tiles or modern porcelain options, I will provide professional tile flooring installation services tailored to your style and preferences.",
        serviceCategory: catData[5]._id,
        servicePrice: 120.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Hardwood Flooring Installation",
        serviceDesc:
          "Elevate your kitchen with the timeless beauty of hardwood flooring. As an expert in hardwood flooring installation, I will bring warmth and sophistication to your kitchen space. From proper subfloor preparation to precision installation techniques, I will ensure a flawless and long-lasting result. Experience the natural elegance and durability of hardwood flooring, enhancing the value and aesthetic appeal of your kitchen. Trust me to deliver exceptional craftsmanship and impeccable hardwood flooring installation services that exceed your expectations.",
        serviceCategory: catData[5]._id,
        servicePrice: 180.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Vinyl Flooring Installation",
        serviceDesc:
          "Upgrade your kitchen with vinyl flooring installation. As a skilled flooring installer, I specialize in providing high-quality vinyl flooring solutions that combine style and durability. From sheet vinyl to luxury vinyl planks, I will guide you in choosing the perfect option for your kitchen. With precision installation techniques and attention to detail, I will deliver a flawless and water-resistant vinyl flooring installation. Enjoy easy maintenance and a wide range of design choices for your kitchen with professional vinyl flooring installation services.",
        serviceCategory: catData[5]._id,
        servicePrice: 100.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Carpet Installation",
        serviceDesc:
          "Add comfort and warmth to your kitchen with carpet installation. As an experienced flooring installer, I offer professional carpet installation services tailored to your kitchen space. From precise measurements to expert carpet laying techniques, I will ensure a perfect fit and a luxurious feel underfoot. Choose from a wide range of carpet styles, colors, and textures to complement your kitchen's aesthetic. Trust me to provide exceptional craftsmanship and reliable carpet installation that transforms your kitchen into a cozy and inviting space.",
        serviceCategory: catData[5]._id,
        servicePrice: 80.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Appliance Installation and Repair
      {
        serviceName: "Refrigerator Repair",
        serviceDesc:
          "Trust me to fix any issues with your refrigerator. As a skilled technician, I specialize in refrigerator repair services. Whether it's a cooling problem, a malfunctioning compressor, or a faulty thermostat, I will diagnose the issue and provide efficient and reliable repairs. Enjoy the convenience of a fully functional refrigerator in your kitchen once again. With my expertise and attention to detail, I will ensure your refrigerator is back to optimal performance.",
        serviceCategory: catData[7]._id,
        servicePrice: 80.5,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "New Appliance Installation",
        serviceDesc:
          "Let me handle the installation of your new kitchen appliances. As an experienced professional, I will ensure proper installation and setup of your appliances, including refrigerators, ovens, dishwashers, and more. With attention to detail and adherence to manufacturer guidelines, I will ensure that your appliances are installed safely and correctly. Sit back and relax while I take care of the installation process, providing you with a hassle-free experience.",
        serviceCategory: catData[7]._id,
        servicePrice: 90.5,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Dishwasher Installation",
        serviceDesc:
          "Upgrade your kitchen with a new dishwasher installation. As a skilled installer, I will ensure a seamless integration of your dishwasher into your kitchen space. From connecting water and drainage lines to proper electrical hookups, I will handle every aspect of the installation process. Enjoy the convenience of a new dishwasher that saves you time and effort in cleaning your dishes. Trust me to provide professional and efficient dishwasher installation services.",
        serviceCategory: catData[7]._id,
        servicePrice: 90.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Paint Room",
        serviceDesc:
          "Transform your dining room with a fresh coat of paint. As a skilled painter, I will revitalize your space with a professional paint job. From surface preparation to precise color application, I will ensure a smooth and even finish. Whether you prefer bold and vibrant colors or subtle and elegant tones, I will work with you to achieve the desired look for your dining room. Trust me to provide high-quality painting services that enhance the ambiance of your dining area.",
        serviceCategory: catData[2]._id,
        servicePrice: 80.5,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Kitchen Renovation
      {
        serviceName: "Stone Countertop Installation",
        serviceDesc:
          "Enhance your kitchen with the beauty and durability of stone countertops. As an experienced installer, I will ensure precise measurements and professional installation of your new stone countertops. From granite to marble, I offer a range of options to suit your style and budget. Enjoy a stunning and functional workspace in your kitchen with high-quality stone countertops that are built to last.",
        serviceCategory: catData[9]._id,
        servicePrice: 90.5,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Cabinet Refacing",
        serviceDesc:
          "Transform the look of your kitchen cabinets with professional cabinet refacing services. By replacing the doors and applying new veneers, I can give your cabinets a fresh and updated appearance. Whether you prefer a modern or traditional style, I will work with you to choose the perfect materials and finishes. Enjoy a cost-effective way to revitalize your kitchen without the need for a full cabinet replacement.",
        serviceCategory: catData[9]._id,
        servicePrice: 1500.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Backsplash Installation",
        serviceDesc:
          "Protect your kitchen walls and add a touch of style with a professionally installed backsplash. I offer a wide range of materials and designs to suit your preferences. From tile to glass, I will ensure precise installation and a seamless finish. Enjoy easy maintenance and a beautiful backdrop for your kitchen activities with a carefully crafted backsplash that enhances the overall aesthetic of your space.",
        serviceCategory: catData[9]._id,
        servicePrice: 75.99,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Appliance Repair",
        serviceDesc:
          "Don't let malfunctioning kitchen appliances disrupt your daily routine. I specialize in professional appliance repair services to get your appliances back in working order. Whether it's a faulty stove, a broken dishwasher, or a malfunctioning oven, I will diagnose the issue and provide efficient and reliable repairs. Trust me to restore the functionality of your kitchen appliances, ensuring your convenience and peace of mind.",
        serviceCategory: catData[9]._id,
        servicePrice: 50.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Kitchen Island Installation",
        serviceDesc:
          "Maximize your kitchen's potential with a professionally installed kitchen island. I will work with you to design and install a functional and stylish island that meets your specific needs. From additional storage space to a breakfast bar, I will ensure a seamless integration into your kitchen layout. Enjoy the benefits of an enhanced workspace and a gathering spot for family and friends with a custom kitchen island.",
        serviceCategory: catData[9]._id,
        servicePrice: 800.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Sink and Faucet Replacement",
        serviceDesc:
          "Upgrade the look and functionality of your kitchen with a sink and faucet replacement. I offer a variety of stylish and efficient options to suit your preferences. From stainless steel to brushed nickel, I will install a high-quality sink and faucet that enhances your kitchen's aesthetics and meets your daily needs. Enjoy a fresh and modern look while improving the overall functionality of your kitchen.",
        serviceCategory: catData[9]._id,
        servicePrice: 120.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      //Electrical Services
      {
        serviceName: "Electrical Panel Upgrade",
        serviceDesc:
          "Ensure your home's electrical system can handle your increasing power needs with an electrical panel upgrade. I will replace your existing panel with a higher-capacity one, providing sufficient power supply for your appliances and electronics. With a focus on safety and compliance, I will ensure the upgrade is done efficiently and professionally, giving you peace of mind and a reliable electrical infrastructure.",
        serviceCategory: catData[4]._id,
        servicePrice: 350.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Electrical Outlet Installation",
        serviceDesc:
          "Enhance the functionality of your kitchen with additional electrical outlets. I will install outlets in strategic locations to accommodate your appliances and devices, ensuring convenient access to power where you need it most. With attention to safety and proper wiring techniques, I will provide a reliable and efficient outlet installation service that meets your specific requirements.",
        serviceCategory: catData[4]._id,
        servicePrice: 80.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Circuit Breaker Replacement",
        serviceDesc:
          "Replace faulty circuit breakers in your electrical panel to ensure the safety and functionality of your electrical system. I will identify and replace damaged or malfunctioning breakers, providing reliable overcurrent protection for your circuits. With expertise in electrical systems, I will ensure the proper sizing and installation of circuit breakers, minimizing the risk of electrical hazards and disruptions.",
        serviceCategory: catData[4]._id,
        servicePrice: 150.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Electrical Wiring Inspection",
        serviceDesc:
          "Ensure the safety and reliability of your home's electrical wiring with a thorough inspection. I will assess the condition of your wiring, identify any potential issues, and provide recommendations for repairs or upgrades. With a focus on compliance with electrical codes and regulations, I will help you maintain a safe and efficient electrical system in your house.",
        serviceCategory: catData[4]._id,
        servicePrice: 120.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Appliance Installation",
        serviceDesc:
          "Ensure your new appliances are installed properly and safely with professional appliance installation services. I will handle the electrical connections, ensuring compatibility and adherence to electrical codes. Whether it's a refrigerator, dishwasher, or range hood, I will ensure a seamless installation, allowing you to enjoy your new appliances without any worries.",
        serviceCategory: catData[4]._id,
        servicePrice: 100.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
      {
        serviceName: "Electrical Troubleshooting",
        serviceDesc:
          "Resolve electrical issues in your house with professional troubleshooting services. I will identify the root cause of electrical problems, such as power outages, flickering lights, or faulty switches, and provide effective solutions. With my expertise in electrical systems, I will diagnose and repair the issues, ensuring the safety and reliability of your electrical infrastructure.",
        serviceCategory: catData[4]._id,
        servicePrice: 80.0,
        serviceQty: 1,
        serviceProviders: [
          userData[0]._id,
          userData[1]._id,
          userData[2]._id,
          userData[3]._id,
        ],
      },
    ]);

    const orders = await Order.create([
      {
        services: services[0]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 99.99,
      },
      {
        services: services[1]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 299.99,
      },
      {
        services: services[2]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 9.99,
      },
      {
        services: services[3]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 29.99,
      },
      {
        services: services[4]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 140.5,
      },
      {
        services: services[5]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 120.99,
      },
      {
        services: services[6]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 150.0,
      },
      {
        services: services[7]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 90.5,
      },
      {
        services: services[8]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 90.5,
      },
      {
        services: services[9]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[1]._id,
        orderPrice: 90.5,
      },
      {
        services: services[10]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[2]._id,
        orderPrice: 100.0,
      },
      {
        services: services[11]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[2]._id,
        orderPrice: 80.0,
      },
      {
        services: services[12]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[3]._id,
        orderPrice: 75.5,
      },
      {
        services: services[13]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[3]._id,
        orderPrice: 120.0,
      },
      {
        services: services[14]._id,
        user: userData[0]._id,
        serviceQty: 1,
        provider: userData[0]._id,
        orderPrice: 95.99,
      },
    ]);

    console.log("Database seeded successfully!");
    // Close the database connection
    db.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    db.close();
  }
};

// Connect to the MongoDB database
db.once("open", async () => {
  try {
    // Seed the database
    await seedDatabase();
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
});
