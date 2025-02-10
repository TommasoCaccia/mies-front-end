import classes from './admin.module.css';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button
} from "@nextui-org/react";
import Link from "next/link";
import ChevronDownIcon from "@/Components/header/tools/ChevronDownIcon";

const Admin = () => {
    return (
        <Dropdown closeOnSelect={false}>
            <DropdownTrigger>
                <Button className={classes.adminButton}>
                    Admin
                    <ChevronDownIcon/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu className={classes.dropdownMenu}>
                <DropdownItem className={classes.dropdownItem}>
                </DropdownItem>
                <DropdownItem className={classes.dropdownItem}>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Admin;