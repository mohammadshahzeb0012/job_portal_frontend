import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover"
import { Avatar } from "../ui/avatar"
import { Popover } from "../ui/popover"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Edit2, Eye, MoreHorizontal } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"

const CompaniesTable = () => {
    const navigate = useNavigate()
    const { companies, searchCompanyByText } = useSelector(store => store.companies);
    const [filterCompany, setFilterCompany] = useState(companies);

    useEffect(() => {
        if (companies?.length > 0) {
            const filterd = companies.filter((company) => company?.name?.toUpperCase().includes(searchCompanyByText))
            setFilterCompany(filterd)
        }
    }, [searchCompanyByText])


    return (
        <div>
            <Table>
                <TableCaption>A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.map((company) => {
                            return <tr key={company._id}>
                                <TableCell>
                                    {
                                        company?.logo ?
                                            <Avatar>
                                                <img src={company?.logo} alt="logo" />
                                            </Avatar> :
                                            <h2>N/A</h2>
                                    }
                                </TableCell>
                                <TableCell>{company.name}</TableCell>
                                <TableCell>{company.updatedAt}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger><MoreHorizontal /></PopoverTrigger>
                                        <PopoverContent className="w-32 ">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                            {/* /admin/jobs/:id/applicants */}
                                            <div onClick={() => navigate(`/admin/jobs/${company._id}/applicants`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Eye className='w-4' />
                                                <span>Applicants</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </tr>
                        })
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default CompaniesTable