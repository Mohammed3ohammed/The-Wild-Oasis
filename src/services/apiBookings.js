import { getToday } from "../utils/helpers";

export async function getBooking(id) {
    const {data, error} = await supabase
    .from("bookings")
    .select("*, cabins(*), gusts(*)")
    .eq("id", id)
    .single();

    if (error) {
        console.error(error);
        throw new Error("Booking not found");
    }
    return data;
}

export async function getBookingsAfterDate(date) {
    const {data, error} = await supabase
    .from("bookings")
    .select("create_at, totalPrice, extrasPrice")
    .gte("create_at", date)
    .lte("create_at", getToday({end: true}));

    if (error) {
        console.error(error)
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function getStaysAfterDate(date) {
    const { data, error } = await supabase
    .from("bookings")
    .select("*, guests(fullName)")
    .gte("startDate", date)
    .lte("startDate", getToday());

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function getStaysTodayActivity() {
    const {data, error} = await supabase
    .from("bookings")
    .select("*, guests(fullName, nationality, countryFlag)")
    .or(
        `and(status.eq.unconfirmed,startDate.eq.${getToday()}),and(status.eq.checked-in,endDate.eq.${getToday()})`
    )
    .order("created_at");

    if (error) {
        console.error(error);
        throw new Error("Bookings could not get loaded");
    }
    return data;
}

export async function updateBooking(id, obj) {
    const {data, error} = await supabase
    .from("bookings")
    .update(obj)
    .eq("id", id)
    .select()
    .single();

    if (error) {
        console.error(error)
        throw new Error("Booking could not be update");
    }
    return data;
}

export async function deleteBooking(id) {
    const {data, error} = await supabase.from("bookings").delete().eq("id", id);
    if (error) {
        console.error(error);
        throw new Error("Booking could not be deleted");
    }
    return data;
}