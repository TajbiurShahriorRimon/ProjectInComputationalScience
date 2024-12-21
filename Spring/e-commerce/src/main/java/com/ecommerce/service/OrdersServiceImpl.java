package com.ecommerce.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import com.ecommerce.dao.OrdersDao;
import com.ecommerce.dao.SalesDao;
import com.ecommerce.entity.Orders;
import com.ecommerce.entity.Sales;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class OrdersServiceImpl implements OrdersService {

    @Autowired
    private OrdersDao ordersDao;

    @Autowired
    private SalesDao salesDao;

    @Autowired
    private EntityManager entityManager;

    @Override
    public Orders addOrder(Orders orders) {
        //Formatting the date format
        Date date = new Date();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MMMM/yyyy");
        orders.setDate(simpleDateFormat.format(date));
        ordersDao.save(orders);
        return orders;
    }

    @Transactional
    @Override
    public java.util.List checkIfCustomerPurchasedProduct(int productId, int customerId){
        // var data = (ArrayList<Orders>) ordersDao.findAll().stream().filter(x -> x.getCustomer().getId() == customerId
        //  && x.getStatus() == "delivered").collect(Collectors.toList());
        // }
        var v = entityManager.createNativeQuery("SELECT orders.* FROM orders, sales WHERE orders.status = 'delivered' AND orders.customer_id = "+customerId + " AND orders.id = sales.order_id AND sales.product_product_id = "+productId)
        .getResultList();
        return v;
    }

    // @Override
    // public Map<Integer, java.util.List<Sales>> getPendingOrders(){
    //     var v = salesDao.findAll().stream().filter(x -> x.getOrder().getStatus() == "pending")
    //     .collect(Collectors.groupingBy(g -> g.getOrder().getId()));
    //     var x = "1";
    //     return v;
    // }

    @Override
    public ArrayList<Orders> getPendingOrders(){
        var v = (ArrayList<Orders>) ordersDao.findAll()
        .stream().filter(x -> x.getStatus().equals("pending")).collect(Collectors.toList());
        return v;
    }

    @Override
    public boolean setDeliverdStatus(int id){
        Orders order = ordersDao.findById(id).get();
        order.setStatus("delivered");
        ordersDao.save(order);
        return true;
    }

    @Override
    public boolean setCancelStatus(int id){
        Orders order = ordersDao.findById(id).get();
        order.setStatus("cancelled");
        ordersDao.save(order);
        return true;
    }

    @Override
    public ArrayList<Orders> getAllOrdersCustomerById(int id) {
        var v = (ArrayList<Orders>) ordersDao.findAll()
        .stream().filter(x -> x.getCustomer().getId() == id).collect(Collectors.toList());
        if(v == null){
            return null;
        }
        return v;
    }

    @Override
    public ArrayList<Orders> getAll() {
        var v = (ArrayList<Orders>) ordersDao.findAll();
        if(v == null){
            return null;
        }
        return v;
    }

    @Transactional
    @Override
    public List<Object> yearlySales() {
        var data = entityManager.createNativeQuery("SELECT SUM(total_price), year(STR_TO_DATE(date, '%d/%M/%Y')) AS year " +
        "FROM orders where status = 'delivered'GROUP BY year(STR_TO_DATE(date, '%d/%M/%Y'))").getResultList();
        return data;
    }

    @Override
    public List<Object> monthlySales(int year) {
        var data = entityManager.createNativeQuery("SELECT SUM(total_price), Date_Format(STR_TO_DATE(date, '%d/%M/%Y'), '%M') AS month, month(Str_To_Date(date, '%d/%M/%Y')) as monthStr "+
         "FROM orders WHERE year(STR_TO_DATE(date, '%d/%M/%Y'))=? and status = 'delivered' GROUP BY month(STR_TO_DATE(date, '%d/%M/%Y'))")
         .setParameter(1, year)
         .getResultList();
        return data;
    }

	@Override
	public double todaysSale() {
		
		return ordersDao.todaysSale();
	}

	@Override
	public double totalsSale() {
		
		return ordersDao.totalSale();
	}

    @Transactional
    @Override
    public Object[][] dailySalesByYearMonth(int year, int month) {
        var numOfDays = entityManager.createNativeQuery("SELECT DAY(LAST_DAY(STR_TO_DATE(date, '%d/%M/%Y'))) FROM orders "+
        "WHERE year(STR_TO_DATE(date, '%d/%M/%Y')) = ? AND month(STR_TO_DATE(date, '%d/%M/%Y')) = ? ")
        .setParameter(1, year)
        .setParameter(2, month)
        .getResultList();
        int lastDay = 0;
        for (Object object : numOfDays) {
            lastDay = (int) object;
            break;
        }
        int lastDayOfMonth = lastDay;

        var data = entityManager.createNativeQuery("SELECT sum(total_price), day(STR_TO_DATE(date, '%d/%M/%Y')) FROM orders "+
        "WHERE status = 'delivered' AND year(STR_TO_DATE(date, '%d/%M/%Y')) = ? "+
        "AND month(STR_TO_DATE(date, '%d/%M/%Y')) = ? GROUP BY day(STR_TO_DATE(date, '%d/%M/%Y'))")
        .setParameter(1, year)
        .setParameter(2, month)
        .getResultList();

        Object [][] ara = new Object[lastDayOfMonth][2];

        int j = 0;

        for(int i = 0; i < lastDayOfMonth; i++){
            if(j < data.size()){
                Object[] s = (Object[]) data.get(j);
                if(s[1].equals(i+1)){
                    ara[i][0] = (double) s[0];
                    ara[i][1] = (int) s[1];
                    j++;
                }
                else{
                    ara[i][0] = 0;
                    ara[i][1] = i+1;
                }
            }
            // try {
            //     Object l = (Double) s[0];
            // } catch (Exception e) {
            //     int u = 0;
            // }
            
            //Object m = (int) s[1];
            // if(s[1].equals(i+1)){
            //     ara[i][0] = (double) s[0];
            //     ara[i][1] = (int) s[1];
            //     j++;
            // }
            else{
                ara[i][0] = 0;
                ara[i][1] = i+1;
            }
        }
        return ara;
    }
    
}
