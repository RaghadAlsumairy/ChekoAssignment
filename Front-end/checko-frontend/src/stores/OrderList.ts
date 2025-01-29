import { create } from "zustand";
import { Order } from "../models/Order";
import MenuItem from "../models/MenuItem";

interface OrderStore {
    orders: Order[]
    totalOrders : number,
    addOrder:(item : MenuItem)=>void 
    deleteOrder:(id : number)=>void 
    claculateTotal:()=>void
}
const OrderList = create<OrderStore>((set, get )=>( {
    orders : [] as Order[], 
    totalOrders : 0,
    addOrder: (item: MenuItem) => {
        const { orders } = get(); 
        const index = orders.findIndex((i) => i.item.id === item.id); 
      
        let updatedOrders = [...orders]; 
      
        if (index === -1) {
          updatedOrders.push({ item, count: 1 });
        } else {
          updatedOrders[index] = {
            ...updatedOrders[index],
            count: updatedOrders[index].count + 1,
          };
          console.log(updatedOrders)
       

        }
        set({ orders: updatedOrders});
        get().claculateTotal();
      
      },
      
      claculateTotal:()=>{
       const currentOrders = get().orders
       var total =0 ;
       currentOrders.forEach((order)=> {
        total += order.count 
       })
       set({totalOrders:total})

      },
      deleteOrder: (id: number) => {
        const orders = get().orders;
        const orderIndex = orders.findIndex(order => order.item.id === id);

        if(orders[orderIndex].count>1){
            orders[orderIndex].count = orders[orderIndex].count -1 
      } 
      else {
        orders.splice(orderIndex, 1);
      }
      if(get().totalOrders>0)
      set((state) => ({
        orders: [...orders],
        totalOrders: state.totalOrders - 1,
      }));
       
        
      },
})
)
export default OrderList;