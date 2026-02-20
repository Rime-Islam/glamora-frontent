"use client";

import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import FilterSortSelect from "@/components/common/SearchFilter/FilterSortSelect";
import SearchInput from "@/components/common/SearchFilter/SearcgInput";
import { useGetAllUser } from "@/hooks/user.hook";
import useDebounce from "@/lib/utils/useDebounce";
import { useState } from "react";
import UserData from "./UserData";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";
import { 
    Users, 
    Search, 
    Filter, 
    ShieldCheck, 
    ShieldAlert, 
    UserPlus,
    Activity,
    LayoutGrid
} from "lucide-react";

const ManageUser = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [isBlocked, setIsblock] = useState("");

    const searchTermText = useDebounce(searchTerm, 500);

    const { data, isLoading } = useGetAllUser(
        searchTermText,
        isBlocked,
        currentPage
    );

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="p-4 sm:p-8 animate-in fade-in duration-700 pb-20">
            {/* ─── Page Header ─── */}
            <div className="mb-12 flex flex-col lg:flex-row lg:items-end justify-between gap-8 px-2">
                <div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-900 text-white flex items-center justify-center shadow-xl">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-500 mb-1">Administrative Access</p>
                            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Identity Directory</h1>
                        </div>
                    </div>
                    <p className="text-sm font-medium text-gray-400 max-w-sm">
                        Manage global user accounts, enforce moderation protocols, and oversee platform population.
                    </p>
                </div>
                
                <div className="flex items-center gap-6 p-2 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl shadow-sm border border-gray-100">
                        <Activity className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Census: {data?.meta?.total || 0}</span>
                    </div>
                </div>
            </div>

            {/* ─── Search & Control Bar ─── */}
            <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-200/50 mb-8 sm:mb-12">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                    <div className="flex-1 max-w-xl">
                        <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 flex items-center gap-2">
                            <Search className="w-3 h-3" /> Targeted Lookup
                        </p>
                        <SearchInput
                            placeholder="Enter account email address..."
                            value={searchTerm}
                            onChange={setSearchTerm}
                        />
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-8">
                        <div>
                             <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 ml-2 flex items-center gap-2">
                                <Filter className="w-3 h-3" /> Security Status
                             </p>
                             <div className="bg-gray-50/50 px-4 py-1.5 rounded-2xl border border-gray-100 flex items-center gap-4">
                                <FilterSortSelect
                                    onChange={setIsblock}
                                    value={isBlocked}
                                    options={[
                                        { label: "Account Restricted", value: "true" },
                                        { label: "Verified Access", value: "false" },
                                    ]}
                                />
                             </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── User Results ─── */}
            <div className="relative">
                {isLoading ? (
                    <div className="space-y-4">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div key={index} className="h-24 bg-white/50 animate-pulse rounded-3xl border border-gray-50" />
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[60vh]">
                        {data?.data && data.data.length > 0 ? (
                            <UserData users={data.data} />
                        ) : (
                            <div className="py-32 flex flex-col items-center justify-center text-center">
                                <div className="w-20 h-20 rounded-3xl bg-gray-50 flex items-center justify-center mb-8 border border-gray-100">
                                    <LayoutGrid className="w-10 h-10 text-gray-200" />
                                </div>
                                <h3 className="text-2xl font-black text-gray-900 mb-2">No Credentials Found</h3>
                                <p className="text-sm font-medium text-gray-400 max-w-xs">
                                    The identity search yielded no matching results in the global database.
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ─── Pagination Control ─── */}
            <div className="mt-12 flex justify-center">
                {data?.meta && data.meta.totalPage > 1 && (
                    <div className="bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-200/50">
                        <DynamicPagination
                            meta={data.meta}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageUser;