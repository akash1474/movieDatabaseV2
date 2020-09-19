import lottie from "lottie-web";
import { Elements } from "./base";

interface BucketItem {
    title: string;
    size: number;
    id: number;
}

export default class Bucket {
    static bucket: BucketItem[] = [];

    static hasRan = false;
    static calculations(): number {
        let totalSize: number = 0;
        this.bucket.forEach((el) => {
            totalSize += el.size;
        });
        return totalSize;
    }

    static renderBucketListCount() {
        Elements.bucketIcon.dataset.items = `${this.bucket.length}`;
    }

    static render() {
        this.renderBucketListCount();
        let items = "";
        this.bucket.forEach((item) => {
            items += `<div class="bucket__movie" data-id="${item.id}">
                                    <div class="movie__title">${
                                        item.title
                                    }</div>
                                    <div class="movie__size">${
                                        item.size > 1024
                                            ? (item.size / 1024).toFixed(2) +
                                              " GB"
                                            : item.size + " MB"
                                    }</div>
                                    <div class="movie__remove">
                                        <svg class="icon-minus">
                                            <use xlink:href="assets.svg#icon-minus"></use>
                                        </svg>
                                    </div>
                                </div>`;
        });

        const totalSize: number = this.calculations();
        const el = `<div class="bucket__header">
                            <header>Bucket List</header>
                            <svg class="icon-cross">
                                    <use xlink:href="assets.svg#icon-cross"></use>
                            </svg>
                        </div><div class="bucket__body">${items}</div>
                            <div class="bucket__stats">
                                <div class="stats__count stats">
                                    <p class="title">Total Count:</p>
                                    <p class="value">${
                                        this.bucket.length
                                    } Movies</p>
                                </div>
                                <div class="stats__size stats">
                                    <p class="title">Total Size:</p>
                                    <p class="value">${(
                                        totalSize / 1024
                                    ).toFixed(2)}GB</p>
                                </div>
                            </div>
                            <div class="bucket__time">
                                Estimated duration for file transfer:<b class="time">${(
                                    (totalSize / 1024) *
                                    0.7
                                ).toFixed(2)} min</b>
                            </div>`;
        Elements.bucketList.innerHTML = el;
        const bucketBody = document.querySelector(
            ".bucket__body"
        )! as HTMLDivElement;
        if (bucketBody.children.length === 0) {
            lottie.loadAnimation({
                container: bucketBody, // the dom element that will contain the animation
                renderer: "svg",
                loop: true,
                autoplay: true,
                path: "empty.json", // the path to the animation json
            });
        }
        (document.querySelector(".icon-cross")! as SVGElement).addEventListener(
            "click",
            (_) => {
                Elements.bucketList.style.transform = "translateY(-10%)";
                Elements.bucketList.style.opacity = "0";
                Elements.bucketList.style.zIndex = "-5";
            }
        );
        if (!this.hasRan) {
            this.addListeners();
        }
    }

    static addListeners() {
        Elements.bucketList.addEventListener("click", (e) => {
            const id = (e.target! as Element).parentElement!.dataset.id;
            if (
                (e.target! as Element).parentElement!.className ===
                    "bucket__movie" &&
                id
            ) {
                this.removeItem(+id);
            }
        });
        this.hasRan = true;
    }

    static addToBucket(item: BucketItem, el: HTMLDivElement) {
        if (this.bucket.findIndex((items) => items.id === item.id) >= 0) {
            alert("Bucket List contains this movie");
        } else {
            // const color="#21dcb9":"#f95393";
            el.style.backgroundColor = "#21dcb9";
            this.bucket.push(item);
            this.renderBucketListCount();
        }
    }

    static removeItem(id: number) {
        const index = this.bucket.findIndex((item) => item.id === id);
        this.bucket.splice(index, 1);
        this.render();
    }
}
