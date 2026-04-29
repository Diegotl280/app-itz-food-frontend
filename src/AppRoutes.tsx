import {Navigate,Route,Routes} from "react-router";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./api/queryClient";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";

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
                
                { /* Protección de Rutas */}
                <Route element={<ProtectedRoute /> } >
                    <Route path="/user-profile" element={
                        <Layout>
                            <UserProfilePage/>
                        </Layout>
                    }/>
                </Route>
                
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </QueryClientProvider>
    )
}//Fin de AppRoute

export default AppRoutes;