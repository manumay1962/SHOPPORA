import React, { useEffect, useState } from "react";
import { HousePlug, LogOut, Menu, ShoppingCart, UserCog } from "lucide-react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser, resetTokenAndCredentials } from "@/store/auth-slice";
import UserCartWrapper from "./cart-wrapper";
import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

function MenuItems() {
  const navigate = useNavigate();
  const location = useLocation();
  

  function handleNavigate(getCurrentMenuItem){
    sessionStorage.removeItem('filters')
    const currentFilter = getCurrentMenuItem.id !== 'home' && getCurrentMenuItem.id !=='products' && getCurrentMenuItem.id !=='search' ?
    {category :[getCurrentMenuItem.id]}:null
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    location.pathname.includes('lisiting') && currentFilter !== null ?
    setSearchParams(new URLSearchParams(`?category=${getCurrentMenuItem.id}`)) :
    navigate(getCurrentMenuItem.path)
  } 
  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label onClick={()=>handleNavigate(menuItem)}
          className="text-sm font-medium cursor-pointer"
          key={menuItem.id}
          
        >
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
}

function HeaderRightContent() {
  const { user } = useSelector((state) => state.auth);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  const {cartItems}=useSelector(state=>state.shopCart)
  const [searchParams,setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
  //  dispatch(logoutUser());
  dispatch(resetTokenAndCredentials());
  sessionStorage.clear();
  navigate("/auth/login")
  }

  useEffect(()=>{
    dispatch(fetchCartItems(user?.id))
  },[dispatch])

  console.log(cartItems,'itemsss');
  
  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
        <Button
          onClick={() => setOpenCartSheet(true)}
          variant="outline"
          size="icon"
          className='relative'
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="absolute top-[-1px] right-[1px] font-bold text-sm">{cartItems?.items?.length || 0}</span>
          <span className="sr-only">User Cart</span>
        </Button>
        <UserCartWrapper setOpenCartSheet={setOpenCartSheet} cartItems={cartItems && cartItems.items && cartItems.items.length > 0 ? cartItems.items :[]} />
      </Sheet>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {user?.userName[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" side="right">
          <DropdownMenuLabel>
            Logged in as {user?.userName.toUpperCase()}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserCog className="mr-2 h-5 w-5 text-black" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2 h-5 w-5 text-black" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/shop/home" className="flex items-center gap-2">
          <HousePlug className="h-6 w-6" />
          <span className="font-bold">SHOPPORA</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex flex-1 justify-center">
          <MenuItems />
        </div>

        {isAuthenticated && (
          <div className="hidden lg:flex items-center gap-4">
            <HeaderRightContent />
          </div>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="max-w-xs w-full p-6">
            <HeaderRightContent />
            <DialogTitle className="sr-only">Navigation Menu</DialogTitle>
            <MenuItems />
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export default ShoppingHeader;
