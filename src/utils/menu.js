const menu = [

    {
        id:0,
        displayName:'Dashboard',
        path:'dashboard',
        role:['SALES', 'ADMIN'] //access role
    },
    {
        id:1,
        displayName:'Admin Panel',
        path:'admin',
        role:['ADMIN'] //access role
    },
    {
        id:2,
        displayName:'Projects',
        path:'projects',
        role:['ADMIN','SALES','USER','AGENT'] //access role
    },
    {
        id:3,
        displayName:'Customers',
        path:'customers',
        role:['ADMIN','SALES'] //access role
    },
    {
        id:4,
        displayName:'Sales',
        path:'sales',
        role:['ADMIN','SALES'] //access role
    },
    {
        id:5,
        displayName:'Agents',
        path:'agents',
        role:['ADMIN'] //access role
    },
    {
        id:6,
        displayName:'Role Mangement',
        path:'roles',
        role:['ADMIN'] //access role
    },
    {
        id:7,
        displayName:'Visits',
        path:'visits',
        role:['AGENT'] //access role
    },
]

// Function to get menu items based on the user role
export const getMenu = (userRole) => {
    const basePath = `/${userRole.toLowerCase()}`; // Define base path using the user's role

    // Filter the menu items based on the user role
    return menu
        .filter((item) => item.role.includes(userRole.toUpperCase())) // Filter by role
        .map((item) => ({
            ...item,
            path: `${basePath}/${item.path}`, // Construct full path
        }));
};





