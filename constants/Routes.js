/**************************
 * @providesModule Routes *
 * @created_by Kds        *
 **************************/

// const webMenus = [ // => example
//     // START: tenant's menu;
//     {
//         id: 'tenant',
//         subMenus: [
//             {
//                 id: 'tenant-list',
//                 child: [
//                     'tenant-list',
//                     'tenant-detail',
//                     'tenant-edit',
//                     'tenant-sip_number',
//                     'tenant-service_package',
//                 ],
//                 name: 'list',
//                 route: '/tenant/list',
//                 page: 'tenant-list',
//                 role: {
//                     module: 'enterprise',
//                     function: 'enterprise_list',
//                     action: 'see',
//                 },
//             },
//         ],
//     },
//     // END: tenant's menu;
//     // START: statistical's menu;
//     {
//         id: 'statistical',
//         subMenus: [
//             {
//                 id: 'statistical-call',
//                 child: [
//                     'statistical-call',
//                 ],
//                 name: 'call',
//                 route: '/statistical/call/report',
//                 page: 'statistical-call',
//                 role: {
//                     module: 'statistical',
//                     function: 'statistical_call',
//                     action: 'see',
//                 },
//             },
//         ],
//     },
//     // END: statistical's menu;
//     // START: manage's menu;
//     {
//         id: 'manage',
//         subMenus: [
//             {
//                 id: 'manage-service_package-list',
//                 child: [
//                     'manage-service_package-list',
//                     'manage-service_package-edit',
//                 ],
//                 name: 'service_package',
//                 route: '/manage/service-package/list',
//                 page: 'manage-service_package-list',
//                 role: {
//                     module: 'admin',
//                     function: 'admin_benefit_package',
//                     action: 'see',
//                 },
//             },
//             {
//                 id: 'manage-sip_number-list',
//                 child: [
//                     'manage-sip_number-list',
//                     'manage-sip_number-detail',
//                     'manage-sip_number-create',
//                     'manage-sip_number-edit',
//                 ],
//                 name: 'sip_number',
//                 route: '/manage/sip-number/list',
//                 page: 'manage-sip_number-list',
//                 role: {
//                     module: 'admin',
//                     function: 'admin_first_number',
//                     action: 'see',
//                 },
//             },
//             {
//                 id: 'manage-call_pricing-list',
//                 child: [
//                     'manage-call_pricing-list',
//                     'manage-call_pricing-create',
//                     'manage-call_pricing-edit',
//                 ],
//                 name: 'call_pricing',
//                 route: '/manage/call-pricing/list',
//                 page: 'manage-call_pricing-list',
//                 role: {
//                     module: 'admin',
//                     function: 'admin_price_list',
//                     action: 'see',
//                 },
//             },
//             {
//                 id: 'manage-agent-list',
//                 child: [
//                     'manage-agent-list',
//                     'manage-agent-detail',
//                     'manage-agent-edit',
//                     'manage-agent-edit-config',
//                 ],
//                 name: 'agent',
//                 route: '/manage/agent/list',
//                 page: 'manage-agent-list',
//                 role: {
//                     module: 'admin',
//                     function: 'admin_employees',
//                     action: 'see',
//                 },
//             },
//             {
//                 id: 'manage-role-list',
//                 child: [
//                     'manage-role-list',
//                     'manage-role-create',
//                     'manage-role-edit',
//                 ],
//                 name: 'role',
//                 route: '/manage/role/list',
//                 page: 'manage-role-list',
//                 role: {
//                     module: 'admin',
//                     function: 'admin_decentralization',
//                     action: 'see',
//                 },
//             },
//             {
//                 id: 'manage-notify-list',
//                 child: [
//                     'manage-notify-list',
//                 ],
//                 name: 'notify',
//                 route: '/manage/notify/list',
//                 page: 'manage-notify-list',
//                 role: {
//                     module: 'admin',
//                     function: 'admin_notify',
//                     action: 'see',
//                 },
//             },
//         ],
//     },
//     // END: manage's menu;
// ];

const routes = [

    // START: tenant's route; => example
    // {
    //     route: '/tenant/list',
    //     page: 'tenant-list',
    //     role: {
    //         module: 'enterprise',
    //         function: 'enterprise_list',
    //         action: 'see',
    //     },
    // },
    // {
    //     route: '/tenant/detail/:dataId/:tabId', // tabId: info, service-package, sip-number, interactive, payment-history, report; 
    //     page: 'tenant-detail',
    //     role: {
    //         module: 'enterprise',
    //         function: [
    //             'enterprise_business_infomation',
    //             'enterprise_benefit_package',
    //             'enterprise_prefix_number_owned',
    //             'enterprise_interactive',
    //             'enterprise_payment_history',
    //             'enterprise_report',
    //         ],
    //         action: ['see', 'see', 'see', 'see', 'see', 'see'],
    //     },
    // },
    // {
    //     route: '/tenant/edit/:dataId',
    //     page: 'tenant-edit',
    //     role: {
    //         module: 'enterprise',
    //         function: 'enterprise_business_infomation',
    //         action: 'addnew_edit',
    //     },
    // },
    // {
    //     route: '/tenant/sip-number/:dataId/:actionId', // actionId: extend;
    //     page: 'tenant-sip_number-action',
    //     role: {
    //         module: 'enterprise',
    //         function: 'enterprise_prefix_number_owned',
    //         action: 'addnew_edit',
    //     },
    // },
    // {
    //     route: '/tenant/service-package/:dataId/:actionId', // actionId: upgrade, extend;
    //     page: 'tenant-service_package-action',
    //     role: {
    //         module: 'enterprise',
    //         function: 'enterprise_benefit_package',
    //         action: 'upgrade',
    //     },
    // },
    // END: tenant's route; => example

    // START: demo welcome page
    {
        route: '/welcome',
        page: 'home-welcome',
    },
    // END: demo welcome page

    // START: common route;
    {
        route: '/error_page',
        page: 'error-page',
    },
    {
        route: '/no_permission_page',
        page: 'no-permission-page',
    },
    {
        route: '/login',
        page: 'common-login',
    },
    // END: common route;

];

module.exports = { routes };