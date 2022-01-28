const graphql = require('graphql');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const Sale = require('../models/sale');
const Purchase = require('../models/purchase');

const Person = require('../models/person')

const SaleCutEntry = require('../models/saleCutEntry')
const CutProduct = require('../models/cutProduct')
const DiscreteSale = require('../models/discreteSale')
const Logistics = require('../models/logistics')
const DiscreteProductEntry = require('../models/discreteProductEntry');
const {
    GraphQLUpload,
  } = require('graphql-upload');
const Lott = require('../models/lott')
const Product = require('../models/product')
const Refund = require('../models/refund')
const User = require('../models/user')
const Place = require('../models/place')
const Firm = require('../models/firm')
const Piece = require('../models/piece');
const Type = require('../models/type');
const Color = require('../models/color');
const Broker = require('../models/broker');
const Size = require('../models/size');
const Factory = require('../models/factory');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
} = graphql;

const FactoryType = new GraphQLObjectType({
    name: 'Factory',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        address: {type: GraphQLString},
        phone:{type: GraphQLString},
        email:{type: GraphQLString}
        
        })

    })


const TypeType = new GraphQLObjectType({
    name: 'Type',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        isCut: {type: graphql.GraphQLBoolean}
        
        })

    })

const ColorType = new GraphQLObjectType({
    name: 'Color',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        hex: {type: GraphQLString}
        
        })

    })

const BrokerType = new GraphQLObjectType({
    name: 'Broker',
    fields: ( ) => ({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        phone: {type: GraphQLString}, 
        email: {type: GraphQLString}
        
        })

    })

const SizeType = new GraphQLObjectType({
    name: 'Size',
    fields: ( ) => ({
        id: { type: GraphQLID },
        length: {type: GraphQLString},
        width: {type: GraphQLString}, 
        height: {type: GraphQLString}
        
        })

    })

const CutProductType = new GraphQLObjectType({
    name: 'CutProduct',
    fields: ( ) => ({
        id: { type: GraphQLID },
        cost: { type: GraphQLInt },
        quantity: {type: GraphQLInt},
        size: { 
            type: GraphQLID, 
        
        },
        place:{
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId);
            }
        },
        purchase:{
            type: PurchaseType,
            resolve(parent, args){
                return Purchase.findById(parent.purchaseId);
            }
        },
        product:{
            type: ProductType,
            resolve(parent, args){
                return Product.findById(parent.productId);
            }
        }

    })
});


const DiscreteSaleType = new GraphQLObjectType({
    name: 'DiscreteSale',
    fields: ( ) => ({
        id: { type: GraphQLID },
        quantity: {type: GraphQLInt},
        discreteProductEntryId: { type: GraphQLID },
        sale:{
            type: SaleType,
            resolve(parent, args){
                return Sale.findById(parent.saleId);
            }
        }

    })
});

const DiscreteProductEntryType = new GraphQLObjectType({
    name: 'DiscreteProductEntry',
    fields: ( ) => ({
        id: { type: GraphQLID },
        length: {type: GraphQLInt},
        width: {type: GraphQLInt},
        height: {type: GraphQLInt},
        pricePer: {type: GraphQLInt},
        purchases:{
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                return DiscretePurchase.find({discreteProductEntryId: parent._id});
            }
        },
        product:{
            type: ProductType,
            resolve(parent, args){
                return Product.findById(parent.productId);
            }
        }

    })
});


const SaleCutEntryType = new GraphQLObjectType({
    name: 'SaleCutEntry',
    fields: ( ) => ({
        
        quantity: {type: GraphQLInt},
        id: { type: GraphQLID },
        piece: {
            type: PieceType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Piece.findById(parent.pieceId);
            }
        }

    })
});

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: ( ) => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        userAccesType: {type: GraphQLInt}

    })
});

const RefundType = new GraphQLObjectType({
    name: 'Refund',
    fields: ( ) => ({
        id: { type: GraphQLID },
        time: { type: GraphQLString },
        date: { type: GraphQLString },
        billNumber: {type: GraphQLInt}

    })
});

const LogisticsType = new GraphQLObjectType({
    name: 'Logistics',
    fields: ( ) => ({
        id: { type: GraphQLID },
        biltyNumber: {type: GraphQLInt},
        freight: {type: GraphQLInt},
        loading: {type: GraphQLInt},
        unloading: {type: GraphQLInt},
        weight: {type: GraphQLInt},
        purchases: {
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Purchase.find({logisticsId : parent._id});
            }
        },



    })
});

const FirmType = new GraphQLObjectType({
    name: 'Firm',
    fields: ( ) => ({
        GSTN: { type: GraphQLString },
        name: { type: GraphQLString },
        id: { type: GraphQLID }
    })
});

const PieceType = new GraphQLObjectType({
    name: 'Piece',
    fields: ( ) => ({
        id: { type: GraphQLID },
        pieceNo: { type: GraphQLInt },
        length: { type: GraphQLInt },
        width: { type: GraphQLInt },

        lott: {
            type: LottType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Lott.findById(parent.lottId);
            }
        },
        place: {
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId );
                //return _.filter(places, { id: parent.placeId });
            }
        }

    })
});


const LottType = new GraphQLObjectType({
    name: 'Lott',
    fields: ( ) => ({
        lottNo: { type: GraphQLInt },
        id: { type: GraphQLID },
        cost: { type: GraphQLInt },
        thisckess: {type: GraphQLInt},
        pieces:{
            type: new GraphQLList(PieceType),
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Piece.find({ lottId : parent._id });
            }
        },
        product: {
            type: ProductType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Product.findById(parent.productId);
            }
        },
        purchase:{
            type: PurchaseType,
            resolve(parent, args){
                return Purchase.findById(parent.purchaseId );
                //return _.filter(places, { id: parent.placeId });
            }
        }


    })
});


const SaleType = new GraphQLObjectType({
    name: 'Sale',
    fields: ( ) => ({
        quantity: {type: GraphQLInt},
        cutOrUncut: {type: GraphQLInt},
        billNumber: {type: GraphQLInt}, 
        invoiceAmount : { type: GraphQLInt },
        id: { type: GraphQLID },
        invoiceDateTime: { type: GraphQLString },
        CustomerName: { type:GraphQLString },
        length:{type: GraphQLInt},
        width: {type: GraphQLInt},
        /*
        cutProduct:{
            type:
        },
        */
        piece:{
            type: PieceType,
            resolve(parent, args){
                return Piece.find({ id: parent.placeId});
                //return _.find(items, { id: parent.itemId });
            }
        },
        saleCutEntry:{
            type: new GraphQLList(SaleCutEntryType),
            resolve(parent, args){
                return SaleCutEntry.find({ saleId: parent._id });
                //return _.find(items, { id: parent.itemId });
            }
        },
        firm:{
            type: FirmType,
            resolve(parent, args){
                return Firm.findById(parent.firmId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        product: {
            type: ProductType,
            resolve(parent, args){
                //return _.find(items, { id: parent.itemId });
                return Product.findById(parent.productId);
            }
        },
        place: {
            type: PlaceType,
            resolve(parent, args){
                return Place.findById(parent.placeId);
                //return _.filter(places, { id: parent.placeId });
            }
        }

    })
});



const PurchaseType = new GraphQLObjectType({
    name: 'Purchase',
    fields: ( ) => ({
        
        weight: { type: GraphQLInt },
        royelty:  { type: GraphQLInt },
        id: { type: GraphQLID },
        billNumber : { type: GraphQLInt },
        invoiceDateTime: { type: GraphQLString },
        broker:{ 
            type: BrokerType,
            resolve(parent, args){
                return Broker.findById(parent.brokerId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        factory:{ 
            type: FactoryType,
            resolve(parent, args){
                return Factory.findById(parent.factoryId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        firm:{
            type: FirmType,
            resolve(parent, args){
                return Firm.findById(parent.firmId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        logistics:{
            type: LogisticsType,
            resolve(parent, args){
                return Logistics.findById(parent.logisticsId);
                //return _.find(items, { id: parent.itemId });
            }
        },
        lotts:{
            type: new GraphQLList(LottType), 
            resolve(parent, args){
                return Lott.find({ purchaseId : parent._id });
                //return _.filter(purchases, { itemId : parent.id });
            }
        }
    })
});


const ProductType = new GraphQLObjectType({
    name: 'Product',
    fields: ( ) => ({
        name: { type: GraphQLString },
        id: { type: GraphQLID },
        type: { 
            type: TypeType,
            resolve(parent, args){
                return Type.find({ id: parent.typeId });
                //return _.filter(purchases, { itemId : parent.id });
            }
        },
        color: { 
            type: ColorType,
            resolve(parent, args){
                return Color.find({ id: parent.colorId });
                //return _.filter(purchases, { itemId : parent.id });
            }
        },
        lotts: {
            type: new GraphQLList(LottType),
            resolve(parent, args){
                return Lott.find({ productId: parent._id });
                //return _.filter(purchases, { itemId : parent.id });
            }
        },
        SaleData:{
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({ productId : parent._id });
                //return _.filter(purchases, { itemId : parent.id });
            }}
    })
});

const PlaceType = new GraphQLObjectType({
    name: 'Place',
    fields: ( ) => ({
        address: { type: GraphQLString },
        name: { type: GraphQLString },
        id: { type: GraphQLID }


    })
});



const PersonType = new GraphQLObjectType({
    name: 'Person',
    fields: ( ) => ({
        name: { type: GraphQLString },
        advance: {type: GraphQLInt},
        salry:  {type: GraphQLInt},
        expenseAllowance : {type: GraphQLInt},
        id: { type: GraphQLID },
        firm: {
            type: FirmType,
            resolve(parent, args){
                return Firm.findById({ id_ : parent.firmId});
                //return _.filter(purchases, { itemId : args.itemId });
            }
        }

    })
});

const TypeAuth = new  GraphQLObjectType({
    name: 'Auth',
    fields: ( ) => ({
        userId: { type: GraphQLID },
        token: {type: GraphQLString},
        tokenExpiration:  {type: GraphQLInt},
        

    })
});



//const Broker = require('../models/broker');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',

    fields: {
        cutProduct:{
            type: CutProductType,
            args:{ id: { type: GraphQLID } },
            resolve(parent, args){
                return CutProduct.findById(args.id);
            }
        },
        size:{
            type: SizeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Size.findById(args.id);
            }
        },
        color:{
            type: ColorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Color.findById(args.id);
            }
        },
        type:{
            type: TypeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Type.findById(args.id);
            }
        },
        broker:{
            type: BrokerType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Broker.findById(args.id);
            }
        },
        praouctsByColor:{
            type: new GraphQLList(ProductType),
            args:{ color: {type: GraphQLString} },
            resolve(parent, args){
                return Product.find({color :args.color});
            }
        },
        discreteProductEntrys:{
            type: new GraphQLList(DiscreteProductEntryType),
            resolve(parent, args){
                return DiscreteProductEntry.find({});
            }
        },
        login: {
            type: TypeAuth,
            args: {
                email: {type: GraphQLString},
                password: {type: GraphQLString}
            },
            async resolve(parent, args){
                const user = await User.findOne({email: args.email});
                if(!user){
                    throw new Error('User does not exist!')
                }
                var isEqual = user.password == args.password
                
                if(!isEqual){
                    throw new Error('Password is incorrect')
                }
            
                const token = jwt.sign({userId: user.id, email: user.email}, 'somesupersecretkey', {
                    expiresIn: '1h'
                });
                return {userId: user.id, token: token, tokenExpiration: 1};
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        discreteProductEntry:{
            type: DiscreteProductEntryType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return DiscreteProductEntry.findById(args.id);
            }
        },
        saleCutEntry:{
            type: SaleCutEntryType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args){
                return SaleCutEntry.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },

        piece:{
            type: PieceType,
            args: {id: { type: GraphQLID } },
            resolve(parent, args, req){
                return Piece.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        lott:{
            type: LottType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Lott.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        lotts:{
            type: new GraphQLList(LottType),
            resolve(parent, args){
                return Lott.find({});

            }
        },
        refund:{
            type: RefundType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Refund.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        users:{
            type: new GraphQLList(UserType),
            resolve(parent, args){
                return User.find({});
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        user: {
            type: UserType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return User.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        firm: {
            type: FirmType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Firm.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        firms:{
            type: new GraphQLList(FirmType),
            resolve(parent, args){
                return Firm.find({});
                //return items;
            }
            
        }
        ,
        
        sale: {
            type: SaleType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Sale.findById(args.id);
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        sales: {
            type: new GraphQLList(SaleType),
            resolve(parent, args){
                return Sale.find({});
                // code to get data from db / other source
                //return _.find(entrys, { id: args.id });
            }
        },
        purchase: {
            type: PurchaseType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Purchase.findById(args.id);
                //return _.find(purchases, { id: args.id });
            }
        },
        purchases: {
            type: new GraphQLList(PurchaseType),
            resolve(parent, args){
                return Purchase.find({});
                //return _.find(purchases, { id: args.id });
            }
        },
        
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Product.findById(args.id);
                //return _.find(items, { id: args.id });
            }
        },
        place: {
            type: PlaceType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Place.findById(args.id);
                //return _.find(places, { id: args.id });
            }
        },
        places:{
            type: new GraphQLList(PlaceType),
            resolve(parent,args){
                return Place.find({});
            }
        }
        
        ,
        products:{
            type: new GraphQLList(ProductType),
            resolve(parent, args){
                return Product.find({});
                //return items;
            }
        },

        person: {
            type: PersonType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                return Person.findById(args.id);
                //return _.find(persons, { id: args.id });
            }
        },
        places:{
            type: new GraphQLList(PlaceType),
            resolve(parent,args){
                return Place.find({});
            }
        },
        persons:{
            type: new GraphQLList(PersonType),
            resolve(parent,args){
                return Person.find({});
            }
        },
        logisticss:{
            type: new GraphQLList(LogisticsType),
            resolve(parent,args){
                return Logistics.find({});
            }
        }
    
    }
});


const Mutation = new GraphQLObjectType({
    
    name: 'Mutation',
    fields: {
        addSize:{
            type: SizeType,
            args:{
                length: { type: new GraphQLNonNull(GraphQLInt) },
                width: { type: new GraphQLNonNull(GraphQLInt) }, 
                height: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let size = new Size({
                    length: args.length,
                    width: args.width,
                    height: args.height
                });
                return size.save();
            }
        },
        addType:{
            type: ColorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                isCut: {type: new GraphQLNonNull(graphql.GraphQLBoolean)}
            },
            resolve(parent, args){
                let type = new Type({
                    name: args.name,
                    isCut: args.isCut,
                });
                return type.save();
            }
        },
        addColor:{
            type: ColorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                hex: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let color = new Color({
                    name: args.name,
                    hex: args.hex
                });
                return color.save();
            }
        },
        addBroker:{
            type: BrokerType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args){
                let broker = new Broker({
                    name: args.name,
                    phone: args.phone, 
                    email: args.email
                });
                return broker.save();
            }
        },
        editPieceSale:{
            type: PieceType,
            args:{
                pieceId: {type: new GraphQLNonNull(GraphQLID)},
                saleId: {type: new GraphQLNonNull(GraphQLID)}
            },
            async resolve(parent, args){
                const piece1 = await Piece.findById(args.pieceId);
                newPiece = new Piece({
                    lottId: piece1.lottId,
                    nameId: piece1.nameId,
                    length: piece1.length,
                    width: piece1.width,
                    placeId: piece1.placeId,
                    firmId: piece1.firmId,
                    saleId: args.saleId
                });
                await piece1.remove();
                return newPiece.save();
            }
            
        }
        ,
        addCutProduct:{
            type: CutProductType,
            args:{
                productId:{type: new GraphQLNonNull(GraphQLID)},
                cost:{type: new GraphQLNonNull(GraphQLInt)},
                placeId: {type: new GraphQLNonNull(GraphQLID)},
                sizeId: {type: new GraphQLNonNull(GraphQLID)},
                quantity:{type: new GraphQLNonNull(GraphQLInt)},
                purchaseId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let cutProduct = new CutProduct({
                    productId: args.productId,
                    cost: args.cost,
                    placeId: args.placeId,
                    sizeId: args.size,
                    quantity: args.quantity,
                    purchaseId: args.purchaseId
                });
                return cutProduct.save();
            }
        },
        addDiscreteSale:{
            type: DiscreteSaleType,
            args:{
                discreteProductEntryId: {type: new GraphQLNonNull(GraphQLID)},
                quantity:{type: new GraphQLNonNull(GraphQLInt)},
                saleId:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let discreteSale = new DiscreteSale({
                    discreteProductEntryId: args.discreteProductEntryId,
                    quantity: args.quantity,
                    saleId: args.saleId
                });
                return discreteSale.save();
            }
        }
        ,
        addDiscreteProductEntry:{
            type: DiscreteProductEntryType, 
            args:{
                length: {type: GraphQLInt},
                width: {type: GraphQLInt},
                height: {type: GraphQLInt}, 
                productId: { type: new GraphQLNonNull(GraphQLID) },
                pricePer: {type: new GraphQLNonNull(GraphQLInt)}
            },
        resolve(parent, args){
            let discreteProductEntry = new DiscreteProductEntry({
                length: args.length,
                width: args.width,
                height: args.height,
                productId: args.productId,
                pricePer: args.pricePer,
            });
            return discreteProductEntry.save();
        }
        },
        addSaleCutEntry:{
            type: SaleCutEntryType,
            args:{
                pieceId: { type: new GraphQLNonNull(GraphQLID) },
                quantity: { type: new GraphQLNonNull(GraphQLInt) },
                saleId: { type: new GraphQLNonNull(GraphQLID) }

            }
        ,
        resolve(parent, args){
            let saleCutEntry = new SaleCutEntry({
                pieceId: args.pieceId,
                quantity: args.quantity,
                saleId: args.saleId
            });
            return saleCutEntry.save();
        }
    },

        addUser:{
            type: UserType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                password: { type: new GraphQLNonNull(GraphQLString) },
                userAccesType: {type: new GraphQLNonNull(GraphQLInt)}
            }
        ,
        resolve(parent, args){
            let user = new User({
                name: args.name,
                email: args.email,
                password: args.password,
                userAccesType: args.userAccesType
            });
            return user.save();
        }
    },
        
        addRefund:{
            type: RefundType,
            args:{
                saleId:{ type: new GraphQLNonNull(GraphQLID) },
                dateTime:  { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let refund = new Refund({
                    billNumber: args.billNumber, 
                    dateTime: args.dateTime,
                });
                return refund.save();
            }
        },
    
        addLogistics:{
            type: LogisticsType,
            args:{
                weight:{ type: new GraphQLNonNull(GraphQLInt) },
                biltyNumber:{ type: new GraphQLNonNull(GraphQLInt) },
                freight: { type: new GraphQLNonNull(GraphQLInt) },
                loading: { type: new GraphQLNonNull(GraphQLInt) },
                unloading: { type: new GraphQLNonNull(GraphQLInt) }, 
                date: { type: new GraphQLNonNull(GraphQLString) }

            }, 
            resolve(parent, args){
                let logistics = new Logistics({
                    weight: args.weight,
                    biltyNumber: args.biltyNumber, 
                    freight: args.freight,
                    loading: args.loading,
                    unloading: args.unloading,
                    date: args.date
                });
                return logistics.save();
            }
        },
        
        addFirm:{
            type: FirmType,
            args:{
                GSTN:{ type: GraphQLString},
                name: { type: GraphQLString},
            },
            resolve(parent, args){
                let firm = new Firm({
                    name: args.name,
                    GSTN: args.GSTN
                });
                return firm.save();
            }
        }
        ,
         
        addPiece:{
            type: PieceType,
            args:{
                lottId: { type: new GraphQLNonNull(GraphQLID) },
                pieceNo: { type: new GraphQLNonNull(GraphQLInt) },
                length: { type: new GraphQLNonNull(GraphQLInt) },
                width: { type: new GraphQLNonNull(GraphQLInt) },
                placeId: { type: new GraphQLNonNull(GraphQLID) },
            },
            resolve(parent, args){
                let piece = new Piece({
                    lottId: args.lottId, 
                    length: args.length,
                    width: args.width,
                    pieceNo: args.pieceNo,
                    placeId: args.placeId,
                });
                return piece.save();
            }

        }
       ,

        addLott:{
            type: LottType,
            args:{
                productId: { type: new GraphQLNonNull(GraphQLID) },
                cost: { type: new GraphQLNonNull(GraphQLInt) },
                lottNo: { type: new GraphQLNonNull(GraphQLInt) },
                thickness: { type: new GraphQLNonNull(GraphQLInt) },
                purchaseId:{ type: GraphQLID }
            },
            resolve(parent, args){
                let lott = new Lott({
                    productId: args.productId, 
                    cost: args.cost,
                    lottNo: args.lottNo,
                    thickness: args.thickness,
                    purchaseId: args.purchaseId
                });
                return lott.save();
            }

        },
        
        addSale: {
            type: SaleType,
            args: {
                
                firmId: { type: new GraphQLNonNull(GraphQLID) },
                pricePer: { type: new GraphQLNonNull(GraphQLInt) },
                placeId: { type: new GraphQLNonNull(GraphQLID) },
                cutOrUncut: { type: new GraphQLNonNull(GraphQLInt) },
                productId: { type: new GraphQLNonNull(GraphQLID) },
                date: { type: new GraphQLNonNull(GraphQLString) }, 
                time: { type: new GraphQLNonNull(GraphQLString) },
                billNumber: { type: new GraphQLNonNull(GraphQLInt) }, 
                CustomerName: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args){
                let sale = new Sale({
                    quantity: args.quantity,
                    discreteProductEntryId: args.discreteProductEntryId,
                    firmId: args.firmId,
                    pricePer: args.pricePer,
                    cutOrUncut: args.cutOrUncut,
                    placeId: args.placeId,
                    productId: args.productId,
                    quantity: args.quantity,
                    date: args.date,
                    time: args.time,
                    billNumber: args.billNumber, 
                    CustomerName: args.CustomerName,
                });
                return sale.save();
            }
        },
        addPurchase: {
            type: PurchaseType,
            args: {
                brokerId:{ type: new GraphQLNonNull(GraphQLID) },
                factoryId:{ type: new GraphQLNonNull(GraphQLID) },
                royelty:{ type: new GraphQLNonNull(GraphQLInt) },
                firmId: { type: new GraphQLNonNull(GraphQLID) },
                invoiceDateTime: { type: new GraphQLNonNull(GraphQLString) }, 
                billNumber: { type: new GraphQLNonNull(GraphQLInt) },
                weight:{ type: new GraphQLNonNull(GraphQLInt) },
                logisticsId: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args){
                let purchase = new Purchase({
                    brokerId: args.brokerId,
                    factoryId: args.factoryId,
                    royelty: args.royelty,
                    weight: args.weight,
                    firmId: args.firmId,
                    invoiceDateTime: args.invoiceDateTime,
                    billNumber: args.billNumber,
                    logisticsId: args.logisticsId
                });
                return purchase.save();
            }
        }, 
        addProduct: {
            type: ProductType,
            args: {

                name: { type: new GraphQLNonNull(GraphQLString) },
                colorId: { type: new GraphQLNonNull(GraphQLString) },
                typeId:  { type: new GraphQLNonNull(GraphQLString) },

            },
            resolve(parent, args){
                let product = new Product({
                    
                    name :args.name,
                    colorId : args.colorId,
                    typeId : args.typeId,

                });
                return product.save();
            }
        },

        
        addPlace: {
            type: PlaceType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                address: {type: new GraphQLNonNull(GraphQLString)},
                phone: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args){
                let place = new Place({
                    name :args.name,
                    address: args.address,
                    phone: args.phone
                });
                return place.save();
            }
        },

        addPerson: {
            type: PersonType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                advance: {type: new GraphQLNonNull(GraphQLInt) },
                salry: {type: new GraphQLNonNull(GraphQLInt)},
                expenseAllowance: {type: new GraphQLNonNull(GraphQLInt)},
                firmId: {type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let person = new Person({
                    name :args.name,
                    advance: args.advance,
                    salry: args.salry,
                    expenseAllowance: args.expenseAllowance,
                    firmId: args.firmId
                });
                return person.save();
            }
        }
    }
});




module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});