import classes from './tools.module.css';
import {
    Dropdown,
    DropdownTrigger,
    DropdownMenu,
    DropdownItem,
    Button,
    ButtonGroup
} from "@nextui-org/react";
import Link from "next/link";
import ChevronDownIcon from "./ChevronDownIcon"

const Tools = () => {
    return (
        <Dropdown closeOnSelect={false}>
            <DropdownTrigger className={classes.dropdownTrigger}>
                <Button className={classes.dropdownTrigger}>
                    Tools
                    <ChevronDownIcon/>
                </Button>
            </DropdownTrigger>
            <DropdownMenu className={classes.dropdownMenu}>
                <DropdownItem className={classes.dropdownItem}>
                    <ButtonGroup variant="flat">
                        <Dropdown className={classes.submenu} closeOnSelect={false}>
                            <DropdownTrigger className={classes.dropdownTrigger}>
                                <Button className={classes.dropdownTrigger} isIconOnly>
                                    Energy Portfolio
                                    <ChevronDownIcon/>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu className={classes.submenu}>
                                <DropdownItem className={classes.dropdownItem}>
                                    <Link href="/energy-portfolio" className={classes.link}>Energy Portfolio</Link>
                                </DropdownItem>
                                <DropdownItem className={classes.dropdownItem}>
                                    <Link href="/pod" className={classes.link}>Carica Bolletta</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </ButtonGroup>
                </DropdownItem>

                <DropdownItem className={classes.dropdownItem}>
                    <Link href="/iso500001" className={classes.link}>Iso 500001</Link>
                </DropdownItem>

                <DropdownItem className={classes.dropdownItem}>
                    <Link href="https://oneview.miesgroup.it/" target="_blank" rel="noopener noreferrer"
                          className={classes.link}>
                        Oneview
                    </Link>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    );
};

export default Tools;