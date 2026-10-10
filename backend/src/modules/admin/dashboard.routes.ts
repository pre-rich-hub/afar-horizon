import { Router } from "express";
import type { Router as RouterType } from "express";
import { prisma } from "../../config/database.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { ok } from "../../utils/api-response.js";
import { mapBooking } from "../../utils/mappers.js";

export const dashboardRouter: RouterType = Router();

dashboardRouter.get(
  "/dashboard/stats",
  asyncHandler(async (_req, res) => {
    const [
      totalTours,
      totalDestinations,
      totalBookings,
      totalContacts,
      totalTestimonials,
      totalSubscribers,
      totalGalleryImages,
      totalBlogPosts,
      recentBookings,
    ] = await Promise.all([
      prisma.tour.count(),
      prisma.destination.count(),
      prisma.booking.count(),
      prisma.contact.count(),
      prisma.testimonial.count(),
      prisma.subscriber.count(),
      prisma.gallery.count(),
      prisma.blog.count(),
      prisma.booking.findMany({
        include: { tour: true },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    return ok(res, "Dashboard stats fetched successfully", {
      totals: {
        tours: totalTours,
        destinations: totalDestinations,
        bookings: totalBookings,
        contacts: totalContacts,
        testimonials: totalTestimonials,
        subscribers: totalSubscribers,
        galleryImages: totalGalleryImages,
        blogPosts: totalBlogPosts,
      },
      recentBookings: recentBookings.map(mapBooking),
    });
  }),
);
