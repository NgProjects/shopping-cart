import { AuthModule } from "./components/auth/auth.module";
import { CartModule } from "./components/cart/cart.module";
import { ProductModule } from "./components/product/product.module";
import { UserModule } from "./components/user/user.module";

export const moduleList = [
    CartModule,
    AuthModule,
    UserModule,
    ProductModule
]