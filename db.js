const csvtojson = require('csvtojson'); 
const filePath = require("./sample.csv")

const hostname = "localhost", 
    username = "localuser", 
    password = "localuser", 
    databsename = "localhost"
  
  
let con = psql.createConnection({ 
    host: hostname, 
    user: username, 
    password: password, 
    database: databsename, 
}); 
  
con.connect((err) => { 
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
    
                con.query(customer_insert, customer_items,  
                    (err, results, fields) => { 
                    if (err) { 
                        console.log( 
            "Unable to insert item at customer table at row ", i + 1); 
                        return console.log(err); 
                    } 
                }); 
    
                con.query(order_insert, order_items,  
                    (err, results, fields) => { 
                    if (err) { 
                        console.log( 
            "Unable to insert item at order table at row ", i + 1); 
                        return console.log(err); 
                    } 
                }); 
                con.query(product_insert, product_items,  
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