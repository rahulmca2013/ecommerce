const Menu = [
  {
    label: "Dashboard",
    icon: "pi pi-fw pi-home",
    path: "/admin/dashboard",
    command: () => {}
  },
  {
    label: "Manage Users",
    icon: "pi pi-fw pi-cog",
    items: [
      {
        label: "User Lists",
        icon: "pi pi-fw pi-bars",
        path: "/admin/users"
      }
    ]
  },
  {
    label: "Manage Challenge",
    icon: "pi pi-fw pi-align-left",
    items: [
      {
        label: "Open Challenges",
        icon: "pi pi-fw pi-bars",
         path: "/admin/open-challenges"
      },
	  {
        label: "Accepted Challenges",
        icon: "pi pi-fw pi-bars",
        path: "/admin/accepted-challenges"
      },
      {
        label: "Match Played Lists",
        icon: "pi pi-fw pi-bars",
        path: "/admin/match-played"
      }
    ]
  },
  {
    label: "Manage CMS",
    icon: "pi pi-fw pi-globe",
    //badge: "9",
    items: [
      {
        label: "Lists",
        icon: "pi pi-fw pi-star-o",
        path: "/admin/content-management"
      },
      
    ]
  },
  
  {
    label: "Global Notifications",
    icon: "pi pi-fw pi-align-left",
    items: [
      {
        label: "Global Notification Lists",
        icon: "pi pi-fw pi-bars",
         path: "/admin/notification-lists"
      },
	  {
        label: "Compose Notification",
        icon: "pi pi-fw pi-bars",
        path: "/admin/global-notification"
      },
      
    ]
  },
  {
    label: "Manage Group",
    icon: "pi pi-fw pi-align-left",
    items: [
      {
        label: "Group List",
        icon: "pi pi-fw pi-bars",
         path: "/admin/manage-groups"
      },
	  {
        label: "Add Group",
        icon: "pi pi-fw pi-bars",
        path: "/admin/add-group"
      },
      
    ]
  },
  {
    label: "Manage Setting",
    icon: "pi pi-fw pi-align-left",
    items: [
      {
        label: "Change Password",
        icon: "pi pi-fw pi-bars",
         path: "/admin/change-password"
      },
	  {
        label: "View Profile",
        icon: "pi pi-fw pi-bars",
        path: "/admin/manage-profile"
      },
      
    ]
  },
  
  
  {
    label: "Feedback Management",
    icon: "pi pi-fw pi-align-left",
    path: "/admin/manage-feedback"
    
  },
  
  
];
export default {
  Menu
};
