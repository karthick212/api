const dbconfig = require('../config/db')
const Request = require("request");
const common = require('../controller/common-Controller')
var distance = require('google-distance');
var geocoder = require('node-geocoder');
distance.apiKey = 'AIzaSyCZsnc36jrvx7sdu0iHfhAbtGGZXFOJ2nA';
var options = {
  provider: 'google',
 
  // Optional depending on the providers
  httpAdapter: 'https', // Default
  apiKey: 'AIzaSyCZsnc36jrvx7sdu0iHfhAbtGGZXFOJ2nA', // for Mapquest, OpenCage, Google Premier
  formatter: null         // 'gpx', 'string', ...
};
var geo = geocoder(options);
var UserController = {
AmountCalc(flat,flong,tlat,tlong,fromcity,tocity,parcelcat,parceltype,small1,medium1,large1,xl1, cb)  {  
     let ResMsg = {};
     /* let flat=res.flat;
      let flong=res.flong;
      let tlat=res.tlat;
      let tlong=res.tlong;
      let fcity=res.fromcity;
      let tcity=res.tocity;
      let parcelcat=res.parcelcat;
      let parceltype=res.parceltype;
      let s1=res.small;
      let m1=res.medium;
      let l1=res.large;
      let xl1=res.xl;*/
	  
console.log("cat==>"+parcelcat);
      let small= small1.substring(1,small1.length);
      let medium=medium1.substring(1,medium1.length);
      let long=large1.substring(1,large1.length);
      let xl=xl1.substring(2,xl1.length);

      ResMsg.LSAmt=0;
      ResMsg.LMAmt=0;
      ResMsg.LLAmt=0;
      ResMsg.LXAmt=0;
      ResMsg.DSAmt=0;
      ResMsg.DMAmt=0;
      ResMsg.DLAmt=0;
      ResMsg.DXAmt=0;
      ResMsg.HAmt=0;
//console.log(flat);
	//		 console.log(flong)
         geo.reverse({lat:flat, lon:flong},(err,fcity)=>{
         geo.reverse({lat:tlat, lon:tlong},(err,tcity)=>{
			 
         /* fromcity=fcity[0].city
          tocity=tcity[0].city
          if(fromcity='undefined')
            fromcity=fcity[0].administrativeLevels.level2long
          if(tocity=='undefined')
            tocity=tcity[0].administrativeLevels.level2long*/

        // if(parcelcat.indexOf('shar')>0)
          {
            let dqry='SELECT id,latitude,longitude,ParcelName,City, ( 3959 * acos( cos( radians(?) ) * cos( radians( Latitude ) ) * cos( radians( longitude ) - radians(?) ) + sin( radians(?) ) * sin( radians( Latitude ) ) ) ) AS distance FROM tbl_parcelcompany  ORDER BY distance LIMIT 0 , 1'
            dbconfig.query(dqry,[flat,flong,flat],(err,rows)=>{      

              //Distance
              ResMsg.parcelname=rows[0].ParcelName
              let Amt=0;          
              let tolat=rows[0].latitude
              let tolong=rows[0].longitude
              //if(parceltype.indexOf('loc')>=0)
              //{ 
               // tolat=tlat
              //  tolong=tlong
             /// }

              distance.get({origin:flat+','+flong,destination:tolat+','+tolong },(err,rowss)=>{
                let dist=rowss.distanceValue/1000
    	
	console.log(small);
                if(small>0)
                {
                  console.log(fromcity+'='+tocity)
				  console.log(parcelcat);
                  if(parcelcat.indexOf('shar')>=0)
                  {
                    let query="select offerprice,SDispRate from tbl_sharingrate where ServiceArea like ? and SharingSize='S-Small' and isActive!='0'"
                    dbconfig.query(query, ['%'+tocity+'%'], (err, rows1) => { try{ this.DistCalc(rows1[0].offerprice,rows1[0].SDispRate,dist,(res)=>{
                      try{ 
					  
					  ResMsg.LSAmt = rows1[0].SDispRate; 
					  console.log(ResMsg.LSAmt);
					  } catch(e) { 
					  ResMsg.LSAmt=0; 
					
					} })}
                    catch(e) { ResMsg.LSAmt=0; }
                     //if(medium>0||long>0||xl>0){}else{return cb(null,ResMsg)}
                    }) 
                  }
				  
                  
                  if(parceltype.indexOf('loc')!=0)
                  {
                    let query="select offerprice from tbl_parcelrate where ParcelName=? and ParcelSize='S-Small' and isActive!='0' and FromCity like ? and ToCity like ?"
                    dbconfig.query(query, [rows[0].ParcelName,'%'+fromcity+'%','%'+tocity+'%'], (err, rows) => { try{ ResMsg.DSAmt = rows[0].offerprice; } catch(e) { ResMsg.DSAmt=0; } })
                  }
                }
                if(medium>0)
                {
                  if(parcelcat.indexOf('shar')>=0)
                  {
                    let query="select offerprice,SDispRate from tbl_sharingrate where ServiceArea like ? and SharingSize='M-Medium' and isActive!='0'"
                     dbconfig.query(query, ['%'+tocity+'%'], (err, rows1) => { try{ this.DistCalc(rows1[0].offerprice,rows1[0].SDispRate,dist,(res)=>{
                      try{ ResMsg.LMAmt = res.SAmt} catch(e) { ResMsg.LMAmt=0; } })}
                      catch(e) { ResMsg.LMAmt=0;}              
                     //if(long>0||xl>0){}else{return cb(null,ResMsg)}
                    })
                  }
                  if(parceltype.indexOf('loc')!=0)
                  {
                    let query="select offerprice from tbl_parcelrate where ParcelName=? and ParcelSize='M-Medium' and isActive!='0' and FromCity like ? and ToCity like ?"
                    dbconfig.query(query, [rows[0].ParcelName,'%'+fromcity+'%','%'+tocity+'%'], (err, rows) => { try{ ResMsg.DMAmt = rows[0].offerprice; } catch(e) { ResMsg.DMAmt=0; } })
                  }
                }
                if(long>0)
                {
                  if(parcelcat.indexOf('shar')>=0)
                  {
                    let query="select offerprice,SDispRate from tbl_sharingrate where ServiceArea like ? and SharingSize='L-Long' and isActive!='0'"
                    dbconfig.query(query, ['%'+tocity+'%'], (err, rows1) => { try{ this.DistCalc(rows1[0].offerprice,rows1[0].SDispRate,dist,(res)=>{
                      try{ ResMsg.LLAmt = res.SAmt} catch(e) { ResMsg.LLAmt=0; } })}
                      catch(e){ResMsg.LLAmt=0;  }              
                    //if(xl>0){}else{return cb(null,ResMsg)}
                    })
                  }
                  if(parceltype.indexOf('loc')!=0)
                  {
                    let query="select offerprice from tbl_parcelrate where ParcelName=? and ParcelSize='L-Long' and isActive!='0' and FromCity like ? and ToCity like ?"
                    dbconfig.query(query, [rows[0].ParcelName,'%'+fromcity+'%','%'+tocity+'%'], (err, rows) => { try{ ResMsg.DLAmt = rows[0].offerprice; } catch(e) { ResMsg.DLAmt=0; } })
                  }
                }
                if(xl>0)
                {
                  if(parcelcat.indexOf('shar')>=0)
                  {
                    let query="select offerprice,SDispRate from tbl_sharingrate where ServiceArea like ? and SharingSize='XL-ExtraLarge' and isActive!='0'"
                    dbconfig.query(query, ['%'+tocity+'%'], (err, rows1) => { try { this.DistCalc(rows1[0].offerprice,rows1[0].SDispRate,dist,(res)=>{
                      try{ ResMsg.LXAmt = res.SAmt} catch(e) { ResMsg.LXAmt=0; } }) }
                      catch(e) { ResMsg.LXAmt=0;}             
                    //if(parceltype.indexOf('loc')>0){}else{return cb(null,ResMsg)}
                    })
                  }
                  if(parceltype.indexOf('loc')!=0)
                  {
                    let query="select offerprice from tbl_parcelrate where ParcelName=? and ParcelSize='XL-ExtraLarge' and isActive!='0' and FromCity like ? and ToCity like ?"
                    dbconfig.query(query, [rows[0].ParcelName,'%'+fromcity+'%','%'+tocity+'%'], (err, rows) => { try{ ResMsg.DXAmt = rows[0].offerprice; } catch(e) { ResMsg.DXAmt=0; } })
                  }
                }
                //Hiring Rate
                {
                  if(parcelcat.indexOf('shar')!=0)
                  {
                    let query="select tMinRate,tAddlRate from tbl_hiringrate where Category=? and ServiceCity like ? and isActive!='0'"
                    dbconfig.query(query, [parcelcat,'%'+tocity+'%'], (err, rows1) => { console.log(rows1); try { this.DistCalc(rows1[0].tMinRate,rows1[0].tAddlRate,dist,(res)=>{
                      console.log(res)
                    try{ ResMsg.HAmt = res.SAmt} catch(e) { ResMsg.HAmt=0; } })              
                    } catch(e) {ResMsg.HAmt=0;}
                    })
                  }
                }
                
                let query="select * from sample"
                dbconfig.query(query,(err,rows1)=>{
                  ResMsg.dist=dist;
                  ResMsg.dist=dist;
                  return cb(null,ResMsg)
                })             
              })
            })  
          }
        })  
      })
   },
   AddBooking(user,callback) {
    console.log(user)
        var date = new Date();
        let todate = new Date().toISOString().slice(0, 10);
        var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        hours = hours < 10 ? "0" + hours : hours;
        var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
        time = hours + ":" + minutes + ":" + seconds;
        let RandomOtp = Math.floor(1000 + Math.random() * 9000)
        //let RandomOtp2 = Math.floor(1000 + Math.random() * 9000)
             
	 
user.couponcode='1';			 
var paramss=[];
		paramss=[user.bid,user.bserial,todate,time,user.fromrange,user.torange,user.fromadd,user.toadd,user.parcelcat,user.parceltype, user.parcelname,   user.fromname,  user.fromadd1, user.fromland,  user.frommob,user.toname,user.toadd1,  user.toland,user.tomob,user.producttype,user.small,user.medium,user.large,user.xl,user.lsamt,user.lmamt,user.llamt,user.lxamt,user.dsamt,user.dmamt,user.dlamt,user.dxamt,user.hamt,user.total,user.localdist,user.paymode,user.bankrefno,user.couponcode,user.couponamt,user.nettotal,user.userid,user.usermob,RandomOtp,user.iscancel,'1'];
console.log(paramss);
		
let insertQuery = 'INSERT INTO `tbl_parcelbooking` (`BookingId`, `BookingSerial`, `BookingDate`, `BookingTime`, `FromRange`, `ToRange`, `FromAddress`, `ToAddress`, `ParcelCategory`, `ParcelType`,        `ParcelName`,      `FromName`, `FromAddress1`, `FromLandmark`, `FromMobile`, `ToName`, `ToAddress1`,`ToLandmark`, `ToMobile`,   `ProductType`,   `small`,   `medium`,   `large`,   `xl`,   `LSAmt`,   `LMAmt`,   `LLAmt`,  `LXAmt`,    `DSAmt`, `DMAmt`,   `DLAmt`,   `DXAmt`,   `HAmt`,   `Total`, `LocalDistance`, `PaymentMode`,   `BankRefNo`, `CouponCode`,     `CouponAmt`,   `NetTotal`, `UserID`,  `UserMobile`, `OTP`,     `isCancel`, `isActive`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  let dd=dbconfig.query(insertQuery,[user.bid,user.bserial,todate,time,user.fromrange,user.torange,user.fromadd,user.toadd,user.parcelcat,user.parceltype, user.parcelname,   user.fromname,  user.fromadd1, user.fromland,  user.frommob,user.toname,user.toadd1,  user.toland,user.tomob,user.producttype,user.small,user.medium,user.large,user.xl,user.lsamt,user.lmamt,user.llamt,user.lxamt,user.dsamt,user.dmamt,user.dlamt,user.dxamt,user.hamt,user.total,user.localdist,user.paymode,user.bankrefno,user.couponcode,user.couponamt,user.nettotal,user.userid,user.usermob,RandomOtp,user.iscancel,'1'], (err, results) => {
          if (results.affectedRows > 0) {
            console.log('success')
            let ResMsg={};
            ResMsg.msg="success"+":"+RandomOtp;
            common.MessageTemplate("PLBKOTP",(results)=>{
              console.log(results)
              let temp=results;
              temp=temp.replace('$bid$',user.bid);
              temp=temp.replace('$otp$',RandomOtp);
              //console.log(temp);
              common.SendSMS(user.usermob,temp,(results)=>{
                if(results!='success')
                  return callback(null,results)
              });
            });
 // }
             return callback(null, ResMsg)
          }
          else {
          return callback(null, results)
          }
        })
        //console.log(dd)
      },

 BillNoGen(cb){
    let qry='select ifnull(max(BookingSerial),0)+1 as cnt from tbl_parcelbooking';
    dbconfig.query(qry,(err,results) => {
      //console.log(results);
      return cb(results)
    })
	},
  DistCalc(rate1,rate2,dist,cb)
  {
    let ResMsg = {}
    try {             
      let firstkm=rate1
      let secndkm=rate2
      Amt=firstkm;
      let diff=dist-4
      if(Math.sign(diff)!=-1)
      {
        for(var i=0;i<parseInt(diff);i++)
          Amt+=secndkm
      }
      ResMsg.SAmt=Amt
      ResMsg.localdist=dist
      return cb(ResMsg)
    } 
    catch(e) { } 
  }
};
module.exports = UserController;

