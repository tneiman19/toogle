import { gql } from "@apollo/client";

//tested 6/4 - working
export const GET_ME = gql`
  query me {
    me {
      _id
      firstName
      lastName
      email
      profileImage
      isProvider
    }
  }
`;

//query returns all service names with service category ID
//tested 6/2 - working
export const QUERY_SERVICES = gql`
  query getServices($limit: Int) {
    services(limit: $limit) {
      _id
      serviceName
      servicePrice
      serviceDesc
      serviceCategory {
        categoryName
        categoryImage
      }
    }
  }
`;

//Query for Provider
export const QUERY_PROVIDERS = gql`
  query Providers($limit: Int) {
    providers(limit: $limit) {
      _id
      firstName
      lastName
      profileImage
      email
    }
  }
`;

export const QUERY_SINGLE_SERVICE = gql`
  query Service($serviceId: ID!) {
    service(serviceId: $serviceId) {
      _id
      serviceName
      serviceDesc
      servicePrice
      serviceQty
      serviceCategory {
        _id
        categoryName
        categoryDesc
        categoryImage
      }
      serviceProviders {
        _id
        firstName
        lastName
        email
        profileImage
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  query getCategories {
    categories {
      _id
      categoryName
      categoryDesc
      categoryImage
    }
  }
`;
//Query orders by context ID
export const QUERY_ORDERS = gql`
  query Orders {
    orders {
      _id
      orderDate
      serviceDate
      orderPrice

      provider {
        _id
        firstName
        lastName
        email
        profileImage
      }
      services {
        _id
        serviceName
        serviceDesc
        serviceQty
      }
    }
  }
`;

// Added additional information to link and render on page
export const QUERY_CATEGORIES_WITH_SERVICES = gql`
  query getAllCategoriesWithServices {
    getAllCategoriesWithServices {
      _id
      categoryName
      categoryDesc
      categoryImage
      services {
        _id
        serviceName
        serviceDesc
        servicePrice
      }
    }
  }
`;

// Query that returns all services user is providing services for
export const QUERY_MY_SERVICES = gql`
  query getMyServices {
    getMyServices {
      serviceCategory {
        categoryName
      }
      serviceName
      _id
    }
  }
`;
