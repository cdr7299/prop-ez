/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";
import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

const skeleton = (index: number) => (
  <div
    key={index}
    className="flex w-full flex-col items-start gap-8 rounded-md border-2 px-2 py-4 shadow-sm"
  >
    <div className="flex w-full items-start gap-1">
      <div className="flex w-full flex-col gap-1">
        <Skeleton className="h-5 w-4/5 bg-slate-200" />
        <Skeleton className="h-5 w-3/5 bg-slate-200" />
      </div>
    </div>
    <div className="flex w-full items-center justify-between">
      <Badge variant="default" className="w-4/12 px-4 py-2">
        <Skeleton className="h-4 w-full bg-slate-100/60"></Skeleton>
      </Badge>
      <Skeleton className="h-5 w-6/12 bg-slate-200"></Skeleton>
    </div>
  </div>
);

export default function Loading() {
  return (
    <>
      <main className="mt-[4.5rem] min-h-[calc(100vh-4.5rem)] w-full sm:hidden">
        <div className="item-center flex size-full justify-center">
          <div className="flex w-full max-w-screen-2xl flex-1 flex-col space-y-8 px-4 py-8 md:flex">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex items-center gap-2  text-xl font-bold tracking-tight sm:text-2xl">
                  Welcome back,
                  <Skeleton className="h-full min-w-52 flex-grow" />
                </div>
                <p className="text-muted-foreground">
                  Here&apos;s a list of properties you have saved!
                </p>
              </div>
              {/* <AddPropertyToolbar
              categories={categories}
              locations={locations}
              brokers={brokers}
            /> */}
            </div>
            <div className="flex flex-col gap-4 ">
              {new Array(5).fill(0).map((_, index) => skeleton(index))}
            </div>
          </div>
        </div>
      </main>
      <main className="mt-[4.5rem] min-h-[calc(100vh-4.5rem)] w-full sm:block">
        <div className="item-center flex size-full justify-center">
          <div className="flex w-full max-w-screen-2xl flex-1 flex-col space-y-8 px-4 py-8 md:flex">
            {/* Header Section */}
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:gap-0">
              <div className="flex w-full flex-col items-start gap-2">
                <div className="flex items-center gap-2  text-xl font-bold tracking-tight sm:text-2xl">
                  Welcome back,
                  <Skeleton className="h-5 min-w-52 flex-grow" />
                </div>
                <p className="text-muted-foreground">
                  Here&apos;s a list of properties you have saved!
                </p>
              </div>

              <div className="flex space-x-4">
                <Skeleton className="h-9 w-32 rounded"></Skeleton>
                <Skeleton className="h-9 w-32 rounded"></Skeleton>
                <Skeleton className="h-9 w-32 rounded"></Skeleton>
                <Skeleton className="h-9 w-32 rounded"></Skeleton>
              </div>
            </div>
            {/* Metrics Cards */}
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {[...Array(2)].map((_, idx) => (
                <Card key={idx}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <Skeleton className="h-4 w-3/5"></Skeleton>
                    <Skeleton className="h-4 w-4" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-9 w-32" />
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Filters Section */}

            {/* Table Structure */}
            <div className="space-y-4">
              <div className="flex w-full space-x-4 rounded-lg border bg-slate-100 px-2 py-1 dark:bg-slate-800">
                <Skeleton className="h-8 w-32 rounded"></Skeleton>
                <Skeleton className="h-8 w-32 rounded"></Skeleton>
                <Skeleton className="h-8 w-32 rounded"></Skeleton>
                <Skeleton className="h-8 w-32 rounded"></Skeleton>
              </div>
              <div className="overflow-hidden rounded-lg border bg-white">
                <div className="p-4">
                  <div className="h-4 w-32 animate-pulse rounded bg-gray-300"></div>
                </div>
                <div className="space-y-4">
                  {[...Array(10)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between space-x-4 border-b border-t px-4 py-6"
                    >
                      <Skeleton className="h-4 w-24 rounded"></Skeleton>
                      <Skeleton className="h-4 w-24 rounded"></Skeleton>
                      <Skeleton className="h-4 w-48 rounded"></Skeleton>
                      <Skeleton className="h-4 w-20 rounded"></Skeleton>
                      <Skeleton className="h-4 w-24 rounded"></Skeleton>
                      <Skeleton className="h-4 w-24 rounded"></Skeleton>
                      <Skeleton className="h-4 w-24 rounded"></Skeleton>
                      <Skeleton className="h-4 w-24 rounded"></Skeleton>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
