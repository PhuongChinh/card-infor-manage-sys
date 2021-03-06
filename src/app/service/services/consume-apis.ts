export class CONSUME_API {

    static apiUrl: string = window['apiUrl'] || ('http://' + '13.229.226.129:8080/api');  
    static USERS: any = {
        LOGIN: '/v1/userCtrl/login',
        USERS: '/v1/users'
    }

    static CUSTOMER: any = {
        CUSTOMERS: '/v1/customers',
        GET_ALL_CUSTOMER: '/v1/customers/search/findAllCustomer'
    }

    static ORDER: any = {
        ORDERS: '/v1/orders',
        CREATE_ORDER: '/v1/orderCtrl/createOrder',
        GET_ORDER_BY_ORDER_LIST_ID: '/v1/orderCtrl/getOrderByOrderListId',
        GET_ALL_ORDER: '/v1/orderCtrl/getAllOrder',
        ASSIGN_JOB: '/v1/orderCtrl/assignJobForWorker',
        PHASE_WORKER_OF_ORDER: '/v1/orderCtrl/getPhaseWorkerOfOrder',
        CONFIRM_COMPLETED_JOB: '/v1/orderCtrl/confirmWorkerCompletedPhase',
        GET_EACH_USER_WORKING: '/v1/orderCtrl/getPhaseWorkerByWorkerId',
        ADD_WORKER_NOTE: '/v1/orderCtrl/addWorkerNote',
        ADD_MANAGER_NOTE: '/v1/orderCtrl/addManagerNote',
        DELETE_ORDER: '/v1/orderCtrl/deleteOrder',
        CANCEL_PHASE: '/v1/orderCtrl/confirmCancelPhase',
        START_PROGESS: '/v1/orderCtrl/startProgess'
    }

    static ORDER_LIST: any = {
        ORDER_LISTS: '/v1/orderLists',
        GET_ORDER_LIST_BY_CUSTOMER_ID: '/v1/orderLists/search/findByCustomerId',
        GET_ALL_ORDER_LIST: '/v1/orderLists/search/findAllOrderList',
        CREATE_ORDER_LITS: '/v1/orderCtrl/createOrderList',
        DELETE_ORDER_LIST: '/v1/orderCtrl/deleteOrderList'
    }

    static REQUIRED: any = {
        REQUIREDS: '/v1/designRequireds',
        CREATE_REQUIRED: '/v1/requiredCtrl/createRequired',
        GET_ALL_REQUIRED: '/v1/requiredCtrl/findAllRequired',
        CONFIRM_COMPLETE_REQUIRED: '/v1/requiredCtrl/completeRequired',
        GET_ALL_REQUIRED_BY_CUSTOMER_ID: '/v1/requiredCtrl/findRequiredByCustomerId',
        DELETE_REQUIRED: '/v1/requiredCtrl/deleteRequired'
    }
}