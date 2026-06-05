from fastapi import FastAPI

from app.database import (
    engine,
    Base
)

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order, OrderItem

from app.routes.product import router as product_router
from app.routes.customer import router as customer_router
from app.routes.order import router as order_router
from app.routes.dashboard import (
    router as dashboard_router
)

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(product_router)
app.include_router(customer_router)
app.include_router(order_router)
app.include_router(
    dashboard_router
)