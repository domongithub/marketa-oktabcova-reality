alter table properties add column if not exists advert_subtype text;
alter table properties add column if not exists advert_room_count text;
alter table properties add column if not exists sale_date date;
alter table properties add column if not exists first_tour_date date;
alter table properties add column if not exists first_tour_date_to date;
alter table properties add column if not exists exclusivity boolean not null default false;
