// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { api } from "@/utils";
import { IOutfits } from "@/interfaces";
import { useGlobalContext } from "@/provider/store";
