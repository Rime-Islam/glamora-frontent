"use client"
import { DynamicPagination } from "@/components/common/pagination/DynamicPagination";
import FilterSortSelect from "@/components/common/SearchFilter/FilterSortSelect";
import SearchInput from "@/components/common/SearchFilter/SearcgInput";
import { useGetAllUser } from "@/hooks/user.hook";
import useDebounce from "@/lib/utils/useDebounce";
import { useState } from "react";
import UserData from "./UserData";
import UserDataSkeleton from "@/components/skeleton/UserdataSkeleton";

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
        <div className="">
            <h1 className="mb-8 text-3xl text-center font-bold">User Management</h1>
             <div className="flex flex-wrap justify-between">
        <SearchInput
          placeholder="Search by Email"
          value={searchTerm}
          onChange={setSearchTerm}
        ></SearchInput>
        <div className="flex items-center gap-2">
          <p>Filter By Status</p>
          <FilterSortSelect
            onChange={setIsblock}
            value={isBlocked}
            options={[
              { label: "Blocked User", value: "true" },
              { label: "Active User", value: "false" },
            ]}
          ></FilterSortSelect>
        </div>
      </div>

      <div className=" min-h-[78vh] lg:min-h-[80vh] mt-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <UserDataSkeleton key={index} />
          ))
        ) : (
          <> {data?.data && <UserData users={data?.data}></UserData>}</>
        )}
      </div>

<div className="flex justify-center mt-5">
        {data?.meta && data && (
          <DynamicPagination
            meta={data.meta}
            onPageChange={handlePageChange}
          ></DynamicPagination>
        )}
      </div>
        </div>
    )
};

export default ManageUser;