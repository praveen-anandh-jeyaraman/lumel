const csvtojson = require('csvtojson'); 
const filePath = require("./sample.csv")
const Pool = require('pg').Pool

const hostname = "localhost", 
    username = "localuser", 
    password = "localuser", 
    databsename = "localhost"
  
  
    const Pool = require('pg').Pool
    const pool = new Pool({
      user: username,
      host: hostname,
      database: databsename,
      password: password,
      port: 5432,
    })
  
    pool.connect((err) => { 
    if (err) return console.error( 
            'error: ' + err.message); 
}); 


function seedData() {
    csvtojson().fromFile(filePath).then(source => { 
  
        for (let i = 0; i < source.length; i++) { 
            var name = source[i]["Customer Name"], 
                email = source[i]["Customer Email"], 
                customer_id = source[i]["Customer ID"],
                adderss = source[i]["Customer Address"], 
                product_id = source[i]["Product ID"],
                product_name = source[i]["Product Name"],
                unit_price = source[i]["Unit Price"],
                discount = source[i]["Discount"],
                shipping_cost = source[i]["shipping_cost"],
                order_id = source[i]["Product ID"],
                date_of_sale = source[i]["Date of Sale"],
                region = source[i]["region"],
                quantity = source[i]["quantity"],
                payment = source[i]["Payment Method"]
    
                let customer_insert = `insert into customer values (?, ?, ?, ?)`
                let customer_items = [customer_id, name, email, adderss]
    
                let order_insert = `insert into order values (?, ?, ?, ?, ?)`
                let order_items = [order_id, date_of_sale, region, quantity, payment]
    
                let product_insert = `insert into product values (?, ?, ?, ?, ?, ?)`
                let product_items = [product_id, product_name, unit_price, discount, shipping_cost]
    
                pool.query(customer_insert, customer_items,  
                    (err, results, fields) => { 
                    if (err) { 
                        console.log( 
            "Unable to insert item at customer table at row ", i + 1); 
                        return console.log(err); 
                    } 
                }); 
    
                pool.query(order_insert, order_items,  
                    (err, results, fields) => { 
                    if (err) { 
                        console.log( 
            "Unable to insert item at order table at row ", i + 1); 
                        return console.log(err); 
                    } 
                }); 
                pool.query(product_insert, product_items,  
                    (err, results, fields) => { 
                    if (err) { 
                        console.log( 
            "Unable to insert item at product table at row ", i + 1); 
                        return console.log(err); 
                    } 
                }); 
                
            }
    })
}
  
seedData()



const express = require('express')
const app = express()

const PORT = 3000

app.post('/getAllCustomers',(req, res) => {
	const {start_date, end_date} = req.body
    let query = `select count(distinct id) from customers where inner join orders on orders.customer_id = customers.id where orders.date_of_sale <= ${start_date} and orders.date_of_sale >= ${end_date}`
    let result = pool.query(query)
    res.json(result)
})

app.post('/getAllOrders', (req, res) => {
    const {start_date, end_date} = req.body
    let query = `select count(distinct id) from orders where date_of_sale <= ${start_date} and date_of_sale >= ${end_date}`
    let result = pool.query(query)
    res.json(result)
})

// app.post('/AverageOrderValue', (req, res) => {
//     const {start_date, end_date} = req.body
//     let query = `select avg(select quantity from orders inner join product unit price where date_of_sale <= ${start_date} and date_of_sale >= ${end_date} inner join )`
//     let result = pool.query(query)
//     res.json(result)
// })


app.listen(PORT, () =>{
	console.log('port running')
})


