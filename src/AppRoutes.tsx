import {Navigate,Route,Routes} from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageRestaurantPage from "./pages/ManageRestaurantPage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes=()=>{
    return(
        <QueryClientProvider client={queryClient}>
            <Routes>
                {/* Rutas Públicas */}
                <Route path="/" element={
                    <Layout showHero={true}>
                         <HomePage/>
                    </Layout>
                }/>
                <Route path='/auth-callback' element={ <AuthCallbackPage />} />
                <Route
                    path="/search/:city"
                    element={
                        <Layout showHero={false}>
                            <SearchPage />
                        </Layout>
                    }
                />
                <Route
                    path="/detail/:restauranteId"
                    element={
                        <Layout showHero={false}>
                            <DetailPage />
                        </Layout>
                    }
                />
                
                { /* Protección de Rutas */}
                <Route element={<ProtectedRoute /> } >
                    <Route path="/user-profile" element={
                        <Layout>
                            <UserProfilePage/>
                        </Layout>
                    }/>
                    <Route path="/manage-restaurant" element={
                        <Layout>
                            <ManageRestaurantPage />
                        </Layout>
                    } />              
                    <Route path="/order-status" element={
                        <Layout>
                            <OrderStatusPage />
                        </Layout>
                    } />
                </Route>
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </QueryClientProvider>
    )
}//Fin de AppRoute

export default AppRoutes;
